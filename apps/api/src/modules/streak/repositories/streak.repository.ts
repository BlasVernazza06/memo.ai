import { Inject, Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';

import { type Database, type NewStreake, streaks } from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

type UpdateStreakData = Partial<
  Pick<NewStreake, 'currentStreak' | 'maxStreak' | 'lastActivity'>
>;

@Injectable()
export class StreakRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database,
  ) {}

  async findByUserId(userId: string) {
    return await this.db.query.streaks.findFirst({
      where: eq(streaks.userId, userId),
    });
  }

  // Aquí irían los métodos para actualizar racha, etc.
  async create(userId: string) {
    const streakId = randomUUID();
    await this.db.insert(streaks).values({
      id: streakId,
      userId: userId,
      currentStreak: 1,
      maxStreak: 1,
      lastActivity: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(userId: string, data: UpdateStreakData) {
    await this.db
      .update(streaks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(streaks.userId, userId));
  }
}
