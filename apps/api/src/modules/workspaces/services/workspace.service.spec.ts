import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { UsersService } from '@modules/users/services/users.service';
import { WorkspacesRepository } from '@modules/workspaces/repositories/workspaces.repository';
import { WorkspacesService } from '@modules/workspaces/services/workspaces.service';
import { AiService } from '@/modules/ai/services/ai.service';
import { StorageService } from '@/modules/storage/services/storage.service';
import { CACHE_KEYS } from '@/common/constants/cache-keys';

describe('WorkspacesService', () => {
  let service: WorkspacesService;
  let repository: WorkspacesRepository;
  let usersService: UsersService;
  let cacheManager: any;

  const mockWorkspacesRepo = {
    create: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    findAllForCards: jest.fn(),
    countWorkspaces: jest.fn(),
  };

  const mockUsersService = {
    validateWorkspaceLimit: jest.fn(),
    validateContentLimit: jest.fn(),
  };

  const mockAiService = {
    generateMoreContent: jest.fn(),
  };

  const mockStorageService = {
    deleteFile: jest.fn(),
  };

  const mockEventEmitter = {
    emit: jest.fn(),
    emitAsync: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  };

  const mockCacheManager = {
    del: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspacesService,
        { provide: WorkspacesRepository, useValue: mockWorkspacesRepo },
        { provide: UsersService, useValue: mockUsersService },
        { provide: AiService, useValue: mockAiService },
        { provide: StorageService, useValue: mockStorageService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    service = module.get<WorkspacesService>(WorkspacesService);
    repository = module.get<WorkspacesRepository>(WorkspacesRepository);
    usersService = module.get<UsersService>(UsersService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deberia estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('createWorkspace', () => {
    it('deberia crear un workspace si el usuario tiene permitido', async () => {
      // Arrange
      const userId = 'user-test';
      const workspaceData = { name: 'Mi Nuevo Workspace' };
      const expectedResponse = { id: 'ws-123' };

      mockUsersService.validateWorkspaceLimit.mockResolvedValue(undefined);
      mockWorkspacesRepo.create.mockResolvedValue(expectedResponse);
      mockWorkspacesRepo.countWorkspaces.mockResolvedValue(1);
      mockEventEmitter.emitAsync.mockResolvedValue([]);

      // Act
      const result = await service.create(userId, workspaceData as any);

      // Assert
      expect(result).toEqual({ id: 'ws-123', newlyUnlocked: [] });
      expect(mockUsersService.validateWorkspaceLimit).toHaveBeenCalledWith(userId);
      expect(mockWorkspacesRepo.create).toHaveBeenCalledWith(userId, workspaceData);
      expect(mockEventEmitter.on).toHaveBeenCalledWith('achievement.unlocked', expect.any(Function));
      expect(mockEventEmitter.emitAsync).toHaveBeenCalledWith('workspace.created', {
        userId,
        workspaceId: 'ws-123',
        totalCount: 1,
      });
      expect(mockEventEmitter.off).toHaveBeenCalledWith('achievement.unlocked', expect.any(Function));
      expect(mockCacheManager.del).toHaveBeenCalledWith(CACHE_KEYS.WORKSPACES_LIST(userId));
    });

    it('deberia prohibirse crear un workspace si el usuario no lo tiene permitido', async () => {
      // Arrange
      const userId = 'user-test';
      const workspaceData = { name: 'Mi Nuevo Workspace' };
      const errorMessage = 'Has alcanzado el límite de workspaces';

      mockUsersService.validateWorkspaceLimit.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(service.create(userId, workspaceData as any)).rejects.toThrow(errorMessage);

      // Verificamos que el repositorio y la caché NO se tocaron tras el error
      expect(mockWorkspacesRepo.create).not.toHaveBeenCalled();
      expect(mockCacheManager.del).not.toHaveBeenCalled();
    });
  });

  describe('findAllForCards', () => {
    it('deberia retornar datos de la cache si existen', async () => {
      // Arrange
      const userId = 'user-test';
      const cachedData = [{ id: '1', name: 'WS1' }];
      mockCacheManager.get.mockResolvedValue(cachedData);

      // Act
      const result = await service.findAllForCards(userId);

      // Assert
      expect(result).toEqual(cachedData);
      expect(mockWorkspacesRepo.findAllForCards).not.toHaveBeenCalled();
      expect(mockCacheManager.set).not.toHaveBeenCalled();
    });

    it('deberia retornar datos del repo si no existen en cache', async () => {
      // Arrange
      const userId = 'user-test';
      const repoData = [{ id: '1', name: 'WS1' }];
      const cacheKey = `workspaces:cards:${userId}`;

      mockCacheManager.get.mockResolvedValue(undefined);
      mockWorkspacesRepo.findAllForCards.mockResolvedValue(repoData);

      // Act
      const result = await service.findAllForCards(userId);

      // Assert
      expect(result).toEqual(repoData);
      expect(mockWorkspacesRepo.findAllForCards).toHaveBeenCalledWith(userId);
      expect(mockCacheManager.set).toHaveBeenCalledWith(cacheKey, repoData, 1800);
    });
  });

  describe('findById', () => {
    it('deberia lanzar NotFoundException si el workspace no existe', async () => {
      // Arrange
      const userId = 'user-test';
      const workspaceId = 'id-falso';

      mockWorkspacesRepo.findById.mockResolvedValue(undefined);

      // Act & Assert
      await expect(service.findById(userId, workspaceId)).rejects.toThrow(NotFoundException);
      expect(mockWorkspacesRepo.findById).toHaveBeenCalledWith(userId, workspaceId);
      expect(mockCacheManager.set).not.toHaveBeenCalled();
    });

    it('deberia retornar el workspace formateado si existe', async () => {
      const userId = 'user-test';
      const workspaceId = 'ws-123';
      const mockWorkspace = {
        id: workspaceId,
        name: 'Workspace Test',
        documents: [],
        flashcardDecks: [],
        quizzes: [],
      };

      mockCacheManager.get.mockResolvedValue(undefined);
      mockWorkspacesRepo.findById.mockResolvedValue(mockWorkspace);

      const result = await service.findById(userId, workspaceId);

      expect(result).toEqual({
        ...mockWorkspace,
        documents: [],
        flashcardDecks: [],
        quizzes: [],
        flashcards: 0,
        quizzesCount: 0,
        docs: 0,
      });
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        CACHE_KEYS.WORKSPACE(userId, workspaceId),
        expect.any(Object),
        1800,
      );
    });
  });

  describe('updateWorkspace', () => {
    it('deberia invalidar AMBAS llaves de cache tras una actualizacion exitosa', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';
      const workspaceData = {
        name: 'Nuevo nombre',
        icon: '🚀',
        description: 'Nueva descripción',
        isFavorite: true,
        bgColor: '#7C3AED',
      };

      mockWorkspacesRepo.findById.mockResolvedValue({
        id: workspaceId,
        name: 'Antiguo nombre',
        icon: '🚀',
        description: 'Antigua descripción',
        isFavorite: false,
        bgColor: '#2563EB',
      });

      mockWorkspacesRepo.update.mockResolvedValue(true);

      const result = await service.update(userId, workspaceId, workspaceData);

      expect(result).toEqual({ success: true });

      expect(mockWorkspacesRepo.findById).toHaveBeenCalledWith(userId, workspaceId);
      expect(mockWorkspacesRepo.update).toHaveBeenCalledWith(userId, workspaceId, {
        name: workspaceData.name,
        icon: workspaceData.icon,
        description: workspaceData.description,
        bgColor: workspaceData.bgColor,
      });
      expect(mockCacheManager.del).toHaveBeenCalledWith(CACHE_KEYS.WORKSPACES_LIST(userId));
      expect(mockCacheManager.del).toHaveBeenCalledWith(CACHE_KEYS.WORKSPACE(userId, workspaceId));
    });

    it('deberia lanzar NotFoundException si el workspace no existe', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';
      const workspaceData = {
        name: 'Nuevo nombre',
      };

      mockWorkspacesRepo.findById.mockResolvedValue(undefined);

      await expect(service.update(userId, workspaceId, workspaceData)).rejects.toThrow(NotFoundException);

      expect(mockWorkspacesRepo.findById).toHaveBeenCalledWith(userId, workspaceId);
      expect(mockWorkspacesRepo.update).not.toHaveBeenCalled();
      expect(mockCacheManager.del).not.toHaveBeenCalled();
    });

    it('deberia lanzar NotFoundException si hay una actualizacion fallida', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';
      const workspaceData = {
        name: 'Nuevo nombre',
      };

      mockWorkspacesRepo.findById.mockResolvedValue({ id: workspaceId });
      mockWorkspacesRepo.update.mockResolvedValue(false);

      await expect(service.update(userId, workspaceId, workspaceData)).rejects.toThrow(NotFoundException);

      expect(mockWorkspacesRepo.findById).toHaveBeenCalledWith(userId, workspaceId);
      expect(mockWorkspacesRepo.update).toHaveBeenCalled();
      expect(mockCacheManager.del).not.toHaveBeenCalled();
    });
  });

  describe('deleteWorkspace', () => {
    it('deberia invalidar AMBAS llaves de cache tras una eliminacion exitosa', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';

      mockWorkspacesRepo.findById.mockResolvedValue({ id: workspaceId, documents: [] });
      mockWorkspacesRepo.delete.mockResolvedValue(true);

      const result = await service.delete(userId, workspaceId);

      expect(result).toEqual({ success: true });

      expect(mockWorkspacesRepo.delete).toHaveBeenCalledWith(userId, workspaceId);
      expect(mockCacheManager.del).toHaveBeenCalledWith(CACHE_KEYS.WORKSPACES_LIST(userId));
      expect(mockCacheManager.del).toHaveBeenCalledWith(CACHE_KEYS.WORKSPACE(userId, workspaceId));
    });

    it('deberia borrar archivos de S3 si existen documentos en el workspace', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';
      const mockDocs = [{ key: 'doc-key-1' }, { key: 'doc-key-2' }];

      mockWorkspacesRepo.findById.mockResolvedValue({
        id: workspaceId,
        documents: mockDocs,
      });
      mockWorkspacesRepo.delete.mockResolvedValue(true);
      mockStorageService.deleteFile.mockResolvedValue(undefined);

      const result = await service.delete(userId, workspaceId);

      expect(result).toEqual({ success: true });
      expect(mockStorageService.deleteFile).toHaveBeenCalledWith('doc-key-1');
      expect(mockStorageService.deleteFile).toHaveBeenCalledWith('doc-key-2');
      expect(mockWorkspacesRepo.delete).toHaveBeenCalledWith(userId, workspaceId);
    });

    it('deberia lanzar NotFoundException tras una eliminacion fallida en base de datos', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';

      mockWorkspacesRepo.findById.mockResolvedValue({ id: workspaceId, documents: [] });
      mockWorkspacesRepo.delete.mockResolvedValue(false);

      await expect(service.delete(userId, workspaceId)).rejects.toThrow(NotFoundException);

      expect(mockWorkspacesRepo.delete).toHaveBeenCalledWith(userId, workspaceId);
      expect(mockCacheManager.del).not.toHaveBeenCalled();
    });

    it('deberia lanzar NotFoundException si el workspace no existe previamente', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';

      mockWorkspacesRepo.findById.mockResolvedValue(undefined);

      await expect(service.delete(userId, workspaceId)).rejects.toThrow(NotFoundException);

      expect(mockWorkspacesRepo.delete).not.toHaveBeenCalled();
      expect(mockCacheManager.del).not.toHaveBeenCalled();
    });
  });
});
