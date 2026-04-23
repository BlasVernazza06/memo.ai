import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as cacheManager from 'cache-manager';

import { DbUser } from '@repo/db';

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
      // Por simplicidad, limitamos por total de items en el workspace
      // Puedes ajustar esto según lo que el usuario considere un "Mazo" o "Quiz"
      const total = await this.userRepo.countContent(workspaceId, type);
      const MAX_FREE = 5;

      if (total >= MAX_FREE) {
        throw new ForbiddenException(
          `Has alcanzado el límite de ${type} para el plan gratuito en este workspace (máx ${MAX_FREE}).`,
        );
      }
    }
  }

  async getUser(userId: string): Promise<DbUser> {
    const cacheKey = CACHE_KEYS.USER_PROFILE(userId);

    const cached = await this.cacheManager.get<DbUser>(cacheKey);
    if (cached) {
      return cached;
    }

    const currentUser = await this.userRepo.findById(userId);

    if (!currentUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.cacheManager.set(cacheKey, currentUser, 600000);

    return currentUser;
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
}
