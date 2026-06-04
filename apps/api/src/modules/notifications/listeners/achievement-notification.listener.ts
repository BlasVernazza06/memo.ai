import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ACHIEVEMENTS } from '@/modules/achievements/constants/achievements.list';
import { NotificationsService } from '../services/notifications.service';

interface AchievementUnlockedPayload {
  userId: string;
  slug: string;
  title: string;
  icon: string;
}

@Injectable()
export class AchievementNotificationListener {
  constructor(private readonly notificationsService: NotificationsService) {}

  /**
   * Se activa cuando se emite el evento global 'achievement.unlocked'.
   * Inserta de forma 100% desacoplada una notificación en el buzón del usuario.
   */
  @OnEvent('achievement.unlocked')
  async handleAchievementUnlocked(payload: AchievementUnlockedPayload) {
    const { userId, slug } = payload;
    const achievement = ACHIEVEMENTS.find((a) => a.slug === slug);

    if (!achievement) return;

    await this.notificationsService.createNotification({
      userId,
      type: 'achievement_unlocked',
      title: `¡Logro Desbloqueado: ${achievement.title}!`,
      message: achievement.description,
      icon: achievement.icon || '🏆',
      metadata: {
        achievementSlug: slug,
      },
    });
  }
}
