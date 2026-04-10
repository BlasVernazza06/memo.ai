import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '@modules/users/services/users.service';
import { WorkspacesRepository } from '@modules/workspaces/repositories/workspaces.repository';
import { WorkspacesService } from '@modules/workspaces/services/workspaces.service';

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
    findAll: jest.fn(),
  };

  const mockUsersService = {
    validateWorkspaceLimit: jest.fn(),
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

  it('deberia crear un workspace si el usuario tiene permitido', async () => {
    // Arrange
    const userId = 'user-test';
    const workspaceData = { name: 'Mi Nuevo Workspace' };
    const expectedResponse = { id: 'ws-123' };

    mockUsersService.validateWorkspaceLimit.mockResolvedValue(undefined);
    mockWorkspacesRepo.create.mockResolvedValue(expectedResponse);

    // Act
    const result = await service.create(userId, workspaceData as any);

    // Assert
    expect(result).toEqual(expectedResponse);
    expect(mockUsersService.validateWorkspaceLimit).toHaveBeenCalledWith(
      userId,
    );
    expect(mockWorkspacesRepo.create).toHaveBeenCalledWith(
      userId,
      workspaceData,
    );
    expect(mockCacheManager.del).toHaveBeenCalledWith(
      `workspaces:list:${userId}`,
    );
  });

  it('deberia prohibirse crear un workspace si el usuario no lo tiene permitido', async () => {
    // Arrange
    const userId = 'user-test';
    const workspaceData = { name: 'Mi Nuevo Workspace' };
    const errorMessage = 'Has alcanzado el límite de workspaces';

    mockUsersService.validateWorkspaceLimit.mockRejectedValue(
      new Error(errorMessage),
    );

    // Act & Assert
    await expect(service.create(userId, workspaceData as any)).rejects.toThrow(
      errorMessage,
    );

    // Verificamos que el repositorio y la caché NO se tocaron tras el error
    expect(mockWorkspacesRepo.create).not.toHaveBeenCalled();
    expect(mockCacheManager.del).not.toHaveBeenCalled();
  });

  it('deberia retornar datos de la cache si existen', async () => {
    // Arrange
    const userId = 'user-test';
    const cachedData = [{ id: '1', name: 'WS1' }];
    mockCacheManager.get.mockResolvedValue(cachedData);

    // Act
    const result = await service.findAll(userId);

    // Assert
    expect(result).toEqual(cachedData);
    expect(mockWorkspacesRepo.findAll).not.toHaveBeenCalled();
    expect(mockCacheManager.set).not.toHaveBeenCalled();
  });

  it('deberia retornar datos del repo si no existen en cache', async () => {
    // Arrange
    const userId = 'user-test';
    const repoData = [{ id: '1', name: 'WS1' }];
    const cacheKey = `workspaces:list:${userId}`;

    mockCacheManager.get.mockResolvedValue(undefined);
    mockWorkspacesRepo.findAll.mockResolvedValue(repoData);

    // Act
    const result = await service.findAll(userId);

    // Assert
    expect(result).toEqual(repoData);
    expect(mockWorkspacesRepo.findAll).toHaveBeenCalledWith(userId);
    expect(mockCacheManager.set).toHaveBeenCalledWith(cacheKey, repoData, 1800);
  });

  it('deberia no retornar workspace si no existe', async () => {
    // Arrange
    const userId = 'user-test';
    const workspaceId = 'id-falso';
    const cacheKey = `workspaces:list:${userId}`;

    mockWorkspacesRepo.findById.mockResolvedValue(undefined);

    // Act
    const result = await service.findById(userId, workspaceId);

    // Assert
    expect(result).toEqual(undefined);
    expect(mockWorkspacesRepo.findById).toHaveBeenCalledWith(userId);
    expect(mockCacheManager.set).not.toHaveBeenCalled();
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
        coverImage: 'https://example.com/new-cover.jpg',
      };

      mockWorkspacesRepo.findById.mockResolvedValue({
        id: workspaceId,
        name: 'Antiguo nombre',
        icon: '🚀',
        description: 'Antigua descripción',
        isFavorite: false,
        coverImage: 'https://example.com/old-cover.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockWorkspacesRepo.update.mockResolvedValue(true);

      const result = await service.update(userId, workspaceId, workspaceData);

      expect(result).toEqual({ success: true });

      expect(mockWorkspacesRepo.findById).toHaveBeenCalledWith(
        userId,
        workspaceId,
      );
      expect(mockWorkspacesRepo.update).toHaveBeenCalledWith(
        userId,
        workspaceId,
        workspaceData,
      );
      expect(mockCacheManager.del).toHaveBeenCalledWith(
        `workspaces:list:${userId}`,
      );
      expect(mockCacheManager.del).toHaveBeenCalledWith(
        `user:${userId}:workspace:${workspaceId}`,
      );
    });

    it('deberia lanzar NotFoundException si el workspace no existe', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';
      const workspaceData = {
        name: 'Nuevo nombre',
        icon: '🚀',
        description: 'Nueva descripción',
        isFavorite: true,
        coverImage: 'https://example.com/new-cover.jpg',
      };

      mockWorkspacesRepo.findById.mockResolvedValue(false);

      await expect(
        service.update(userId, workspaceId, workspaceData),
      ).rejects.toThrow(NotFoundException);

      expect(mockWorkspacesRepo.findById).toHaveBeenCalledWith(
        userId,
        workspaceId,
      );
      expect(mockWorkspacesRepo.update).not.toHaveBeenCalledWith();

      expect(mockCacheManager.del).not.toHaveBeenCalledWith();
    });

    it('deberia lanzar NotFoundException si hay una actualizacion fallida', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';
      const workspaceData = {
        name: 'Nuevo nombre',
        icon: '🚀',
        description: 'Nueva descripción',
        isFavorite: true,
        coverImage: 'https://example.com/new-cover.jpg',
      };

      mockWorkspacesRepo.findById.mockResolvedValue({
        id: workspaceId,
        name: 'Antiguo nombre',
        icon: '🚀',
        description: 'Antigua descripción',
        isFavorite: false,
        coverImage: 'https://example.com/old-cover.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(
        service.update(userId, workspaceId, workspaceData),
      ).rejects.toThrow(NotFoundException);

      expect(mockWorkspacesRepo.findById).toHaveBeenCalledWith(
        userId,
        workspaceId,
      );
      expect(mockWorkspacesRepo.update).toHaveBeenCalledWith();

      expect(mockCacheManager.del).not.toHaveBeenCalledWith();
    });
  });

  describe('deleteWorkspace', () => {
    it('deberia invalidar AMBAS llaves de cache tras una eliminacion exitosa', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';

      mockWorkspacesRepo.delete.mockResolvedValue(true);

      const result = await service.delete(userId, workspaceId);

      expect(result).toEqual({ success: true });

      expect(mockWorkspacesRepo.delete).toHaveBeenCalledWith(
        userId,
        workspaceId,
      );
      expect(mockCacheManager.del).toHaveBeenCalledWith(
        `workspaces:list:${userId}`,
      );
      expect(mockCacheManager.del).toHaveBeenCalledWith(
        `user:${userId}:workspace:${workspaceId}`,
      );
    });

    it('deberia lanzar NotFoundException tras una eliminacion fallida', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';

      mockWorkspacesRepo.delete.mockResolvedValue(false);

      await expect(service.delete(userId, workspaceId)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockWorkspacesRepo.delete).toHaveBeenCalledWith();

      expect(mockCacheManager.del).not.toHaveBeenCalledWith();
    });

    it('deberia lanzar NotFoundException si el repositorio no encuentra o no puede borrar', async () => {
      const userId = 'user-123';
      const workspaceId = 'ws-123';

      // 1. Arrange: Forzamos al repositorio a decir "no pude" (false)
      mockWorkspacesRepo.delete.mockResolvedValue(false);
      // 2. Act & Assert: Esperamos que el servicio propague el error
      await expect(service.delete(userId, workspaceId)).rejects.toThrow(
        NotFoundException,
      );
      // 3. Assert Técnico: Verificamos que SÍ se intentó borrar pero NO se limpió la caché
      expect(mockWorkspacesRepo.delete).toHaveBeenCalledWith(
        userId,
        workspaceId,
      );
      expect(mockCacheManager.del).not.toHaveBeenCalled();
    });
  });
});
