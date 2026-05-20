import { Injectable } from '@nestjs/common';

import { StreakRepository } from '@modules/streak/repositories/streak.repository';

import { getDifferenceInCalendarDays } from '@/common/utils/date.utils';

@Injectable()
export class StreakService {
  constructor(private readonly streakRepository: StreakRepository) {}

  async getUserStreak(userId: string) {
    const streak = await this.streakRepository.findByUserId(userId);
    if (!streak) return null;

    const diffDays = getDifferenceInCalendarDays(
      new Date(),
      streak.lastActivity,
    );

    if (diffDays > 0 && streak.currentStreak > 0) {
      await this.streakRepository.update(userId, {
        currentStreak: 0,
        maxStreak: streak.maxStreak,
        lastActivity: streak.lastActivity,
      });
      streak.currentStreak = 0;
    }
    return streak;
  }

  async recordActivity(userId: string) {
    const actualDate = new Date();
    const userStreak = await this.streakRepository.findByUserId(userId);

    if (!userStreak) {
      await this.streakRepository.create(userId);
      return;
    }

    const diffDays = getDifferenceInCalendarDays(
      actualDate,
      userStreak.lastActivity,
    );

    if (diffDays == 0) {
      await this.streakRepository.update(userId, {
        currentStreak: userStreak.currentStreak,
        maxStreak: userStreak?.maxStreak,
        lastActivity: actualDate,
      });
    } else if (diffDays == 1) {
      await this.streakRepository.update(userId, {
        currentStreak: userStreak.currentStreak + 1,
        maxStreak: Math.max(userStreak.maxStreak, userStreak.currentStreak),
        lastActivity: actualDate,
      });
    } else {
      await this.streakRepository.update(userId, {
        currentStreak: 0,
        maxStreak: userStreak?.maxStreak,
        lastActivity: actualDate,
      });
    }
  }
}
