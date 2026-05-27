import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { UsersService } from '@modules/users/services/users.service';
import { WorkspacesRepository } from '@modules/workspaces/repositories/workspaces.repository';
import * as cacheManager from 'cache-manager';

import { type WorkspaceWithRelations } from '@repo/db';

import { CACHE_KEYS } from '@/common/constants/cache-keys';
import { AiService } from '@/modules/ai/services/ai.service';
import { StorageService } from '@/modules/storage/services/storage.service';

import {
  CreateWorkspaceDTO,
  UpdateWorkspaceDTO,
  WorkspaceCardDTO,
  WorkspaceDetailDTO,
} from '../dto/workspace.dto';



@Injectable()
export class WorkspacesService {
  constructor(
    private readonly workspaceRepo: WorkspacesRepository,
    private readonly usersService: UsersService,
    private readonly aiService: AiService,
    private readonly storageService: StorageService,
    private readonly eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: cacheManager.Cache,
  ) {}

  async generateMoreContent(
    userId: string,
    workspaceId: string,
    type: 'flashcards' | 'quizzes',
    customPrompt?: string,
  ) {
    // 1. Validar límites de plan
    await this.usersService.validateContentLimit(userId, workspaceId, type);

    // 2. Obtener workspace con su chat de creación
    const workspaceDetail = await this.workspaceRepo.findById(
      userId,
      workspaceId,
    );
    if (!workspaceDetail)
      throw new NotFoundException('Workspace no encontrado');

    const creationChat = workspaceDetail.chats?.find(
      (c) => c.type === 'creation',
    );
    const history =
      creationChat?.messages
        ?.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        ?.map((m) => `${m.role}: ${m.content}`)
        .join('\n') || '';

    // 3. Llamar a la IA con el contexto histórico y el prompt personalizado
    const context = `
CONTEXTO DEL WORKSPACE:
Nombre: ${workspaceDetail.name}
Descripción: ${workspaceDetail.description || 'No proporcionada'}

HISTORIAL DE CREACIÓN:
${history || 'No hay mensajes previos.'}
`;

    const jsonSchema =
      type === 'flashcards'
        ? `{ "flashcards": [ { "front": "pregunta", "back": "respuesta" } ] }`
        : `{ "quizzes": [ { "name": "Título", "description": "...", "questions": [ { "question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "A", "explanation": "..." } ] } ] }`;

    const basePrompt = `Eres un experto en el tema "${workspaceDetail.name}". 
Tu tarea es generar contenido educativo ADICIONAL basado ESTRICTAMENTE en el contexto y el historial proporcionados.

REGLAS CRÍTICAS:
1. No inventes temas nuevos ajenos al material.
2. No repitas preguntas o tarjetas que ya aparezcan en el historial.
3. Responde ÚNICAMENTE con un objeto JSON siguiendo este esquema: ${jsonSchema}
4. Si el historial no es suficiente, básate en el nombre y descripción del workspace.`;

    const userInstruction = customPrompt
      ? `\n\nINSTRUCCIONES ESPECÍFICAS DEL USUARIO: ${customPrompt}`
      : '';

    const aiData = await this.aiService.generateContentFromPrompt(
      basePrompt,
      `${context}${userInstruction}\n\nGenera ${type === 'flashcards' ? 'más flashcards' : 'un nuevo quiz'} ahora:`,
      type,
    );

    // 4. Guardar el nuevo contenido
    if (type === 'flashcards') {
      const decks = aiData.flashcardDecks || [];
      const singleCards = aiData.flashcards || (Array.isArray(aiData) ? aiData : null);

      if (decks.length > 0) {
        // Si la IA devolvió mazos estructurados
        for (const deck of decks) {
          await this.workspaceRepo.addFlashcards(
            workspaceId,
            deck.flashcards,
            deck.name || workspaceDetail.name,
          );
        }
      } else if (singleCards && singleCards.length > 0) {
        // Formato de array simple de flashcards
        await this.workspaceRepo.addFlashcards(
          workspaceId,
          singleCards,
          workspaceDetail.name,
        );
      } else {
        console.warn('[WorkspacesService] No se encontraron flashcards en la respuesta de la IA:', aiData);
      }
    } else if (type === 'quizzes') {
      const quizzesToSave = aiData.quizzes || (Array.isArray(aiData) ? aiData : null);

      if (quizzesToSave && quizzesToSave.length > 0) {
        await this.workspaceRepo.addQuizzes(workspaceId, quizzesToSave);
      } else {
        console.warn('[WorkspacesService] No se encontraron quizzes en la respuesta de la IA:', aiData);
      }
    }

    // Invalidad caché
    await this.cacheManager.del(CACHE_KEYS.WORKSPACE(userId, workspaceId));

    return { success: true };
  }

  async create(
    userId: string,
    data: CreateWorkspaceDTO,
  ): Promise<{ id: string; newlyUnlocked: any[] }> {
    // Lógica de negocio: Validar límite de workspaces
    await this.usersService.validateWorkspaceLimit(userId);

    // Persistencia delegada al repositorio
    const result = await this.workspaceRepo.create(userId, data);

    const cacheKey = CACHE_KEYS.WORKSPACES_LIST(userId);

    await this.cacheManager.del(cacheKey);

    const newlyUnlocked: any[] = [];
    const tempListener = (event: any) => {
      if (event.userId === userId) {
        newlyUnlocked.push({
          slug: event.slug,
          title: event.title,
          icon: event.icon,
        });
      }
    };

    // Registrar listener temporal
    this.eventEmitter.on('achievement.unlocked', tempListener);

    try {
      const workspacesCount = await this.workspaceRepo.countWorkspaces(userId);
      // Emitir el evento que evalúa los logros sincrónicamente
      await this.eventEmitter.emitAsync('workspace.created', {
        userId,
        workspaceId: result.id,
        totalCount: workspacesCount,
      });
    } finally {
      // Desregistrar
      this.eventEmitter.off('achievement.unlocked', tempListener);
    }

    return {
      id: result.id,
      newlyUnlocked,
    };
  }

  async findAllForCards(userId: string): Promise<WorkspaceCardDTO[]> {
    const cacheKey = `workspaces:cards:${userId}`;
    const cached = await this.cacheManager.get<WorkspaceCardDTO[]>(cacheKey);

    if (cached) return cached;
    const workspaces = await this.workspaceRepo.findAllForCards(userId);

    await this.cacheManager.set(cacheKey, workspaces, 1800);
    return workspaces;
  }

  async getSummary(userId: string): Promise<{
    workspaces: number;
    docs: number;
    flashcards: number;
  }> {
    const summary = await this.workspaceRepo.getSummary(userId);

    return {
      workspaces: Number(summary.workspaces),
      docs: Number(summary.docs),
      flashcards: Number(summary.flashcards),
    };
  }

  async findById(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceDetailDTO> {
    const cacheKey = CACHE_KEYS.WORKSPACE(userId, workspaceId);

    const cached = await this.cacheManager.get<WorkspaceDetailDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    console.log(
      `[WorkspacesService] Buscando workspace ${workspaceId} para usuario ${userId}`,
    );
    const foundWorkspace = await this.workspaceRepo.findById(
      userId,
      workspaceId,
    );

    if (!foundWorkspace) {
      console.log(`[WorkspacesService] Workspace ${workspaceId} NO encontrado`);
      throw new NotFoundException('Workspace no encontrado');
    }

    console.log(
      `[WorkspacesService] Workspace encontrado. Documentos:`,
      foundWorkspace.documents?.length || 0,
    );

    const formattedWorkspace = {
      ...foundWorkspace,
      documents: foundWorkspace.documents || [],
      flashcardDecks: foundWorkspace.flashcardDecks || [],
      quizzes: foundWorkspace.quizzes || [],
      flashcards: (foundWorkspace.flashcardDecks || []).reduce(
        (acc, deck) => acc + (deck.cardsCount || 0),
        0,
      ),
      quizzesCount: foundWorkspace.quizzes?.length || 0,
      docs: foundWorkspace.documents?.length || 0,
    };

    await this.cacheManager.set(cacheKey, formattedWorkspace, 1800);

    return formattedWorkspace as unknown as WorkspaceDetailDTO;
  }

  async like(
    userId: string,
    workspaceId: string,
  ): Promise<{ success: boolean }> {
    const success = await this.workspaceRepo.like(userId, workspaceId);

    if (!success) {
      throw new NotFoundException('Workspace no encontrado');
    }

    const listCacheKey = CACHE_KEYS.WORKSPACES_LIST(userId);
    const itemCacheKey = CACHE_KEYS.WORKSPACE(userId, workspaceId);

    await Promise.all([
      this.cacheManager.del(listCacheKey),
      this.cacheManager.del(itemCacheKey),
    ]);

    return { success: true };
  }

  async delete(
    userId: string,
    workspaceId: string,
  ): Promise<{ success: boolean }> {
    const workspaceDetail = await this.workspaceRepo.findById(
      userId,
      workspaceId,
    );
    if (!workspaceDetail)
      throw new NotFoundException('Workspace no encontrado');
    console.log(
      `[WorkspacesService] Iniciando proceso de eliminación para workspace: ${workspaceId}`,
    );
    // 1. Borrar documentos de S3
    const docs = workspaceDetail.documents || [];
    if (docs.length > 0) {
      console.log(
        `[WorkspacesService] Borrando ${docs.length} documentos de S3...`,
      );
      for (const doc of docs) {
        if (doc.key) {
          try {
            await this.storageService.deleteFile(doc.key);
            console.log(
              `[WorkspacesService] Archivo borrado de S3: ${doc.key}`,
            );
          } catch (error) {
            console.error(
              `[WorkspacesService] Error al borrar archivo ${doc.key} de S3:`,
              error,
            );
          }
        }
      }
    }
    // 2. Borrar de la base de datos (repositorio)
    const success = await this.workspaceRepo.delete(userId, workspaceId);

    if (!success) {
      throw new NotFoundException('Error al eliminar el workspace de la BD');
    }

    const listCacheKey = CACHE_KEYS.WORKSPACES_LIST(userId);
    const itemCacheKey = CACHE_KEYS.WORKSPACE(userId, workspaceId);

    await Promise.all([
      this.cacheManager.del(listCacheKey),
      this.cacheManager.del(itemCacheKey),
    ]);

    return { success: true };
  }

  async update(
    userId: string,
    workspaceId: string,
    data: UpdateWorkspaceDTO,
  ): Promise<{ success: boolean }> {
    // Validar existencia antes de actualizar
    const existing = await this.workspaceRepo.findById(userId, workspaceId);
    if (!existing) {
      throw new NotFoundException('Workspace no encontrado');
    }

    if (!data) {
      return { success: false };
    }

    const { name, icon, description, bgColor } = data;
    const updatedData = { name, icon, description, bgColor };

    const success = await this.workspaceRepo.update(
      userId,
      workspaceId,
      updatedData,
    );

    if (!success) {
      throw new NotFoundException('Error al actualizar el workspace');
    }

    // Invalidación de caché
    const listCacheKey = CACHE_KEYS.WORKSPACES_LIST(userId);
    const itemCacheKey = CACHE_KEYS.WORKSPACE(userId, workspaceId);

    await Promise.all([
      this.cacheManager.del(listCacheKey),
      this.cacheManager.del(itemCacheKey),
    ]);

    return { success: true };
  }
}
