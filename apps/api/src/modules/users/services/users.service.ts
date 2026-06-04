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
import { StorageService } from '@/modules/storage/services/storage.service';

import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly storageService: StorageService,
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
        `La creación de ${type === 'flashcards' ? 'flashcards' : 'quizzes'} adicionales está limitada al plan Pro. ¡Pásate a Pro para estudiar sin límites!`,
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
    // 1. Obtener todas las claves (keys) de S3 de todos los documentos del usuario
    try {
      const keys = await this.userRepo.getUserDocumentKeys(userId);
      if (keys.length > 0) {
        console.log(
          `[UsersService] Borrando ${keys.length} archivos de S3 para el usuario ${userId}...`,
        );
        // Borramos los archivos en paralelo usando Promise.allSettled
        // para que si alguno falla, no se interrumpa el flujo del resto
        const deleteResults = await Promise.allSettled(
          keys.map((key) => this.storageService.deleteFile(key)),
        );
        deleteResults.forEach((result, idx) => {
          if (result.status === 'rejected') {
            console.error(
              `[UsersService] Error al borrar el archivo ${keys[idx]} de S3:`,
              result.reason,
            );
          } else {
            console.log(
              `[UsersService] Archivo borrado exitosamente de S3: ${keys[idx]}`,
            );
          }
        });
      }
    } catch (error) {
      console.error(
        `[UsersService] Error crítico al obtener o borrar archivos de S3 para usuario ${userId}:`,
        error,
      );
      // Continuamos de todas formas para no dejar la cuenta del usuario en un estado corrupto
    }

    // 2. Proceder a borrar el usuario de la base de datos (desencadena cascada)
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
