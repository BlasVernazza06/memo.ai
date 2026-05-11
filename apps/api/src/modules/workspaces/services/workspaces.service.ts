import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from '@modules/users/services/users.service';
import { WorkspacesRepository } from '@modules/workspaces/repositories/workspaces.repository';
import * as cacheManager from 'cache-manager';

import { type WorkspaceWithRelations } from '@repo/db';

import { CACHE_KEYS } from '@/common/constants/cache-keys';
import { AiService } from '@/modules/ai/services/ai.service';
import { StorageService } from '@/modules/storage/services/storage.service';

import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspaceCardDto,
} from '../dto/workspace.dto';

export type WorkspaceWithCounts = WorkspaceWithRelations & {
  flashcards?: number;
  quizzesCount?: number;
  docs?: number;
};

@Injectable()
export class WorkspacesService {
  constructor(
    private readonly workspaceRepo: WorkspacesRepository,
    private readonly usersService: UsersService,
    private readonly aiService: AiService,
    private readonly storageService: StorageService,
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
    const basePrompt = `Basándote en el material anterior, genera MÁS ${type === 'flashcards' ? 'Flashcards' : 'Quizzes'}.
    IMPORTANTE: No repitas lo que ya generaste. Enfócate en detalles o temas que no se hayan cubierto profundamente aún.`;

    const finalPrompt = customPrompt
      ? `${basePrompt}\n\nINSTRUCCIONES ADICIONALES DEL USUARIO: ${customPrompt}`
      : basePrompt;

    const aiData = await this.aiService.generateContentFromPrompt(
      'Eres un asistente experto en la creación de contenido educativo a partir de documentos. Tu objetivo es generar material didáctico de alta calidad, optimizado para el aprendizaje.',
      `${history}\n\n${finalPrompt}`,
      type,
    );

    // 4. Guardar el nuevo contenido
    if (type === 'flashcards') {
      if (aiData.flashcardDecks && aiData.flashcardDecks.length > 0) {
        // Si la IA devolvió mazos estructurados, los agregamos todos
        for (const deck of aiData.flashcardDecks) {
          await this.workspaceRepo.addFlashcards(
            workspaceId,
            deck.flashcards,
            deck.name || workspaceDetail.name,
          );
        }
      } else if (aiData.flashcards) {
        // Formato antiguo o simplificado
        await this.workspaceRepo.addFlashcards(
          workspaceId,
          aiData.flashcards,
          workspaceDetail.name,
        );
      }
    } else if (type === 'quizzes' && aiData.quizzes) {
      await this.workspaceRepo.addQuizzes(workspaceId, aiData.quizzes);
    }

    // Invalidad caché
    await this.cacheManager.del(CACHE_KEYS.WORKSPACE(userId, workspaceId));

    return { success: true };
  }

  async create(
    userId: string,
    data: CreateWorkspaceDto,
  ): Promise<{ id: string }> {
    // Lógica de negocio: Validar límite de workspaces
    await this.usersService.validateWorkspaceLimit(userId);

    // Persistencia delegada al repositorio
    const result = await this.workspaceRepo.create(userId, data);

    const cacheKey = CACHE_KEYS.WORKSPACES_LIST(userId);

    await this.cacheManager.del(cacheKey);

    return result;
  }

  async findAllForCards(userId: string): Promise<WorkspaceCardDto[]> {
    const cacheKey = `workspaces:cards:${userId}`;
    const cached = await this.cacheManager.get<WorkspaceCardDto[]>(cacheKey);

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
  ): Promise<WorkspaceWithCounts> {
    const cacheKey = CACHE_KEYS.WORKSPACE(userId, workspaceId);

    const cached = await this.cacheManager.get<WorkspaceWithCounts>(cacheKey);
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
        (acc, deck) => acc + (deck.flashcards?.length || 0),
        0,
      ),
      quizzesCount: foundWorkspace.quizzes?.length || 0,
      docs: foundWorkspace.documents?.length || 0,
    };

    await this.cacheManager.set(cacheKey, formattedWorkspace, 1800);

    return formattedWorkspace as WorkspaceWithCounts;
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
    data: UpdateWorkspaceDto,
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
