import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as cacheManager from 'cache-manager';

import { UserDTO } from '@repo/validators';

import { CACHE_KEYS } from '@/common/constants/cache-keys';

import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UsersRepository,
    @Inject(CACHE_MANAGER) private cacheManager: cacheManager.Cache,
  ) {}

  async validateWorkspaceLimit(userId: string): Promise<void> {
    const currentUser = await this.userRepo.findById(userId);

    if (!currentUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (currentUser.plan === 'free') {
      const workspacesCount = await this.userRepo.countWorkspaces(userId);

      if (workspacesCount >= 3) {
        throw new ForbiddenException(
          'Límite de workspaces alcanzado. Pásate al plan Pro para crear workspaces ilimitados.',
        );
      }
    }
  }

  async validateContentLimit(
    userId: string,
    workspaceId: string,
    type: 'flashcards' | 'quizzes',
  ): Promise<void> {
    const currentUser = await this.userRepo.findById(userId);
    if (!currentUser) throw new NotFoundException('Usuario no encontrado');

    if (currentUser.plan === 'free') {
      throw new ForbiddenException(
        `La creación de ${type === 'flashcards' ? 'flashcards' : 'quizzes'} adicionales está limitada al plan Pro. ¡Pásate a Pro para estudiar sin límites!`
      );
    }
  }

  async getUser(userId: string): Promise<UserDTO> {
    const cacheKey = CACHE_KEYS.USER_PROFILE(userId);

    const cached = await this.cacheManager.get<UserDTO>(cacheKey);
    if (cached) {
      return cached;
    }

    const currentUser = await this.userRepo.findById(userId);

    if (!currentUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.cacheManager.set(cacheKey, currentUser, 600000);

    return currentUser as UserDTO;
  }

  async deleteUser(userId: string): Promise<{ success: boolean }> {
    const success = await this.userRepo.deleteUserById(userId);

    if (success) {
      await this.cacheManager.del(CACHE_KEYS.WORKSPACES_LIST(userId));
      await this.cacheManager.del(CACHE_KEYS.USER_PROFILE(userId));
    }

    return { success: true };
  }

  async updateBillingInfo(
    userId: string,
    data: {
      plan: 'free' | 'pro';
      stripeCustomerId?: string;
      stripeSubscriptionId?: string;
      stripeSubscriptionStatus?: string;
      stripePriceId?: string;
    },
  ) {
    await this.userRepo.update(userId, {
      ...data,
      updatedAt: new Date(),
    });
  }

  async getUserStats(userId: string) {
    return await this.userRepo.getUserStats(userId);
  }
}
