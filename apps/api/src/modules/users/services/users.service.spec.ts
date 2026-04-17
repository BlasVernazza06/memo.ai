import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersRepository } from '@modules/users/repositories/users.repository';
import { UsersService } from '@modules/users/services/users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUsersRepository = {
    findById: jest.fn(),
    countWorkspaces: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository, // Aquí inyectamos el doble
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('validateWorkspaceLimit', () => {
    it('deberia permitir crear un workspace si el usuario tiene menos de 3 (Plan Free)', async () => {
      const userId = 'user-123';
      mockUsersRepository.findById.mockResolvedValue({
        id: userId,
        plan: 'free',
      });
      mockUsersRepository.countWorkspaces.mockResolvedValue(1);

      await expect(
        service.validateWorkspaceLimit(userId),
      ).resolves.not.toThrow();

      expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId);

      expect(mockUsersRepository.countWorkspaces).toHaveBeenCalledWith(userId);
    });

    it('deberia lanzar un error si el usuario tiene 3 workspaces (Plan Free)', async () => {
      const userId = 'user-123';
      mockUsersRepository.findById.mockResolvedValue({
        id: userId,
        plan: 'free',
      });
      mockUsersRepository.countWorkspaces.mockResolvedValue(3);

      await expect(service.validateWorkspaceLimit(userId)).rejects.toThrow(
        ForbiddenException,
      );

      expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId);

      expect(mockUsersRepository.countWorkspaces).toHaveBeenCalledWith(userId);
    });
    it('deberia permitir crear un workspaces si el usuario tiene mas de 3 (Plan Pro)', async () => {
      const userId = 'user-123';
      mockUsersRepository.findById.mockResolvedValue({
        id: userId,
        plan: 'pro',
      });
      mockUsersRepository.countWorkspaces.mockResolvedValue(3);

      await expect(
        service.validateWorkspaceLimit(userId),
      ).resolves.not.toThrow();

      expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId);

      expect(mockUsersRepository.countWorkspaces).toHaveBeenCalledWith(userId);
    });

    it('deberia lanzar NotFoundException si no existe el usuario', async () => {
      const userId = 'user-123';
      mockUsersRepository.findById.mockResolvedValue(null);

      await expect(service.validateWorkspaceLimit(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('getUser', () => {
    it('deberia retornar el usuario si existe', async () => {
      const userId = 'user-123';
      const fakeUser = { id: userId };
      mockUsersRepository.findById.mockResolvedValue(fakeUser);

      await expect(service.getUser(userId)).resolves.toEqual(fakeUser);

      expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('deberia lanzar NotFound si no existe el usuario', async () => {
      const userId = 'user-123';
      mockUsersRepository.findById.mockResolvedValue(null);

      await expect(service.getUser(userId)).rejects.toThrow(NotFoundException);

      expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateBillingInfo', () => {
    it('deberia actualizar toda la informacion de facturacion y el plan correcto', async () => {
      const userId = 'user-123';
      const billingData = {
        plan: 'pro' as const,
        stripeCustomerId: 'cus_890',
        stripeSubscriptionId: 'sub_456',
        stripeSubscriptionStatus: 'active',
        stripePriceId: 'price_123',
      };

      await service.updateBillingInfo(userId, billingData);

      expect(mockUsersRepository.update).toHaveBeenCalledWith(userId, {
        ...billingData,
        updatedAt: expect.any(Date),
      });
    });
  });
});
