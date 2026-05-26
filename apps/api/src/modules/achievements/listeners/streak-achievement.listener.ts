import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { AchievementsService } from '../service/achievements.service';

interface StreakUpdatedPayload {
  userId: string;
  currentStreak: number;
  maxStreak: number;
}

@Injectable()
export class StreakAchievementListener {
  constructor(private readonly achievementsService: AchievementsService) {}

  @OnEvent('streak.updated')
  async handleStreakUpdated(payload: StreakUpdatedPayload) {
    const { userId, maxStreak } = payload;

    await this.achievementsService.checkAndUnlock(
      userId,
      'streak_3',
      maxStreak >= 3,
    );

    await this.achievementsService.checkAndUnlock(
      userId,
      'streak_7',
      maxStreak >= 7,
    );

    await this.achievementsService.checkAndUnlock(
      userId,
      'streak_30',
      maxStreak >= 30,
    );
  }
}
