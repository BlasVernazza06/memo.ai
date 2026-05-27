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

    // Auto-curación: Si la última actividad fue hoy o ayer (diffDays <= 1), pero la racha quedó en 0 por el bug anterior,
    // la reparamos a 1 de forma segura ya que el usuario completó actividad dentro del plazo de gracia.
    if (diffDays <= 1 && streak.currentStreak === 0) {
      await this.streakRepository.update(userId, {
        currentStreak: 1,
        maxStreak: Math.max(streak.maxStreak, 1),
        lastActivity: streak.lastActivity,
      });
      streak.currentStreak = 1;
      streak.maxStreak = Math.max(streak.maxStreak, 1);
    } else if (diffDays > 1 && streak.currentStreak > 0) {
      // Un día de gracia: solo reiniciamos a 0 si han pasado más de 1 día calendario sin actividad
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
      const nextStreak = userStreak.currentStreak + 1;
      await this.streakRepository.update(userId, {
        currentStreak: nextStreak,
        maxStreak: Math.max(userStreak.maxStreak, nextStreak),
        lastActivity: actualDate,
      });
    } else {
      // Si la racha se había roto (pasó más de 1 día), la reiniciamos comenzando en 1 hoy
      await this.streakRepository.update(userId, {
        currentStreak: 1,
        maxStreak: Math.max(userStreak.maxStreak, 1),
        lastActivity: actualDate,
      });
    }
  }
}
