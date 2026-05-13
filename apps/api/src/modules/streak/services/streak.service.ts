import { Injectable } from '@nestjs/common';
import { StreakRepository } from '../repositories/streak.repository';

@Injectable()
export class StreakService {
  private readonly useMock = process.env.USE_MOCK_DATA === 'true';

  constructor(private readonly streakRepository: StreakRepository) {}

  async getUserStreak(userId: string) {
    // Si el modo mock está activado, devolvemos datos falsos sin tocar la DB
    if (this.useMock) {
      console.log('🏗️ [MOCK MODE] Returning simulated streak data');
      return {
        id: 'mock-id',
        userId: userId,
        currentStreak: 12,
        maxStreak: 25,
        lastActivity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return await this.streakRepository.findByUserId(userId);
  }
}
