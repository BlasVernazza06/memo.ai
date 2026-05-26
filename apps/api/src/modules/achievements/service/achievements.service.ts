import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { ACHIEVEMENTS } from '../constants/achievements.list';
import { AchievementsRepository } from '../repositories/achievements.repository';

@Injectable()
export class AchievementsService {
  constructor(
    private readonly achievementsRepo: AchievementsRepository,
    private readonly eventEmitter: EventEmitter2,
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

    const wasUnlockedNow = await this.achievementsRepo.unlock(userId, slug);

    // En achievements.service.ts corregido:
    // En achievements.service.ts corregido:
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
