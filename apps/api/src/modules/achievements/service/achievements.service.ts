import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { eq } from 'drizzle-orm';
import { type Database, user } from '@repo/db';
import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

import { ACHIEVEMENTS } from '../constants/achievements.list';
import { AchievementsRepository } from '../repositories/achievements.repository';

@Injectable()
export class AchievementsService {
  constructor(
    private readonly achievementsRepo: AchievementsRepository,
    private readonly eventEmitter: EventEmitter2,
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
  ) {}

  /**
   * Valida la elegibilidad y delega la escritura segura al repositorio.
   * Emite 'achievement.unlocked' solo si se desbloqueó por primera vez.
   */
  async checkAndUnlock(
    userId: string,
    slug: string,
    isEligible: boolean,
  ): Promise<void> {
    if (!isEligible) return;

    // Verificar si el usuario es del plan gratuito
    const currentUser = await this.db.query.user.findFirst({
      where: eq(user.id, userId),
    });
    
    // Si es free, los logros están inhabilitados
    if (!currentUser || currentUser.plan === 'free') {
      return;
    }

    const wasUnlockedNow = await this.achievementsRepo.unlock(userId, slug);

    if (wasUnlockedNow) {
      const achievement = ACHIEVEMENTS.find((a) => a.slug === slug);
      if (!achievement) return;

      // Anunciamos globalmente el logro desbloqueado de forma desacoplada
      this.eventEmitter.emit('achievement.unlocked', {
        userId,
        slug,
        title: achievement.title,
        icon: achievement.icon,
      });
    }
  }

  /**
   * Devuelve el catálogo completo cruzado con el estado real del usuario.
   */
  async getUserAchievements(userId: string) {
    const currentUser = await this.db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    // Si el usuario es free, los logros se muestran bloqueados por completo
    if (!currentUser || currentUser.plan === 'free') {
      return ACHIEVEMENTS.map((achievement) => ({
        ...achievement,
        unlocked: false,
        unlockedAt: null,
      }));
    }

    const unlocked = await this.achievementsRepo.findAllByUserId(userId);
    const unlockedSlugsMap = new Map(
      unlocked.map((item) => [item.achievementSlug, item.unlockedAt]),
    );

    return ACHIEVEMENTS.map((achievement) => {
      const isUnlocked = unlockedSlugsMap.has(achievement.slug);
      const unlockedAt = unlockedSlugsMap.get(achievement.slug) ?? null;

      return {
        ...achievement,
        unlocked: isUnlocked,
        unlockedAt: unlockedAt,
      };
    });
  }
}
