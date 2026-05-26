import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

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
    const { userId, title, icon } = payload;

    await this.notificationsService.createNotification({
      userId,
      type: 'achievement_unlocked',
      title: '¡Logro Desbloqueado! 🏆',
      message: `Has conseguido el logro: "${title}"`,
      icon: icon || '⭐',
      metadata: {
        achievementSlug: payload.slug,
      },
    });
  }
}
