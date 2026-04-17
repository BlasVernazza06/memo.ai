import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from '@modules/users/services/users.service';
import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
} from '@modules/workspaces/dto/workspace-update.dto';
import { WorkspacesRepository } from '@modules/workspaces/repositories/workspaces.repository';
import * as cacheManager from 'cache-manager';

import { type WorkspaceWithRelations } from '@repo/db';

import { AiService } from '@/modules/ai/services/ai.service';

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
    @Inject(CACHE_MANAGER) private cacheManager: cacheManager.Cache,
  ) {}

  async generateMoreContent(
    userId: string,
    workspaceId: string,
    type: 'flashcards' | 'quizzes',
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
        ?.map((m) => `${m.role}: ${m.content}`)
        .join('\n') || '';

    // 3. Llamar a la IA con el contexto histórico
    const userPrompt = `Basándote en el material anterior, genera MÁS ${type}.
    IMPORTANTE: No repitas lo que ya generaste. Enfócate en detalles o temas que no se hayan cubierto profundamente aún.`;

    const aiData = await this.aiService.processDocument(
      undefined,
      `${history}\n\n${userPrompt}`,
    );

    // 4. Guardar el nuevo contenido
    if (type === 'flashcards' && aiData.flashcards) {
      // Reutilizamos la lógica del repo o creamos una pequeña aquí
      // Por ahora el repo solo tiene create workspace entero.
      // Debería agregar métodos parciales al repo.
      await this.workspaceRepo.addFlashcards(
        workspaceId,
        aiData.flashcards,
        workspaceDetail.name,
      );
    } else if (type === 'quizzes' && aiData.quizzes) {
      await this.workspaceRepo.addQuizzes(workspaceId, aiData.quizzes);
    }

    // Invalidad caché
    await this.cacheManager.del(`user:${userId}:workspace:v2:${workspaceId}`);

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

    const cacheKey = `workspaces:list:${userId}`;

    await this.cacheManager.del(cacheKey);

    return result;
  }

  async findAll(userId: string): Promise<WorkspaceWithCounts[]> {
    const cacheKey = `workspaces:list:${userId}`;

    const cachedWorkspaces =
      await this.cacheManager.get<WorkspaceWithRelations[]>(cacheKey);
    if (cachedWorkspaces) {
      return cachedWorkspaces;
    }

    const workspaces = await this.workspaceRepo.findAll(userId);

    const formattedWorkspaces = workspaces.map((ws) => ({
      ...ws,
      flashcards: ws.flashcardDecks?.reduce(
        (acc, deck) => acc + (deck.flashcards?.length || 0),
        0,
      ),
      quizzesCount: ws.quizzes?.length || 0,
      docs: ws.documents?.length || 0,
    }));

    await this.cacheManager.set(cacheKey, formattedWorkspaces, 1800);

    return formattedWorkspaces as WorkspaceWithCounts[];
  }

  async getSummary(userId: string): Promise<{
    workspaces: number;
    docs: number;
    flashcards: number;
  }> {
    const workspaces = await this.workspaceRepo.findAll(userId);

    const summary = {
      workspaces: workspaces.length,
      docs: workspaces.reduce(
        (acc, ws) => acc + (ws.documents?.length || 0),
        0,
      ),
      flashcards: workspaces.reduce(
        (acc, ws) =>
          acc +
          (ws.flashcardDecks?.reduce(
            (dAcc, deck) => dAcc + (deck.flashcards?.length || 0),
            0,
          ) || 0),
        0,
      ),
    };

    return summary;
  }

  async findById(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceWithCounts> {
    const cacheKey = `user:${userId}:workspace:v2:${workspaceId}`;

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

    const listCacheKey = `workspaces:list:${userId}`;
    const itemCacheKey = `user:${userId}:workspace:v2:${workspaceId}`;

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
    const success = await this.workspaceRepo.delete(userId, workspaceId);

    if (!success) {
      throw new NotFoundException('Workspace no encontrado');
    }

    const listCacheKey = `workspaces:list:${userId}`;
    const itemCacheKey = `user:${userId}:workspace:v2:${workspaceId}`;

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

    const { name, icon, description } = data;
    const updatedData = { name, icon, description };

    const success = await this.workspaceRepo.update(
      userId,
      workspaceId,
      updatedData,
    );

    if (!success) {
      throw new NotFoundException('Error al actualizar el workspace');
    }

    // Invalidación de caché
    const listCacheKey = `workspaces:list:${userId}`;
    const itemCacheKey = `user:${userId}:workspace:v2:${workspaceId}`;

    await Promise.all([
      this.cacheManager.del(listCacheKey),
      this.cacheManager.del(itemCacheKey),
    ]);

    return { success: true };
  }
}
