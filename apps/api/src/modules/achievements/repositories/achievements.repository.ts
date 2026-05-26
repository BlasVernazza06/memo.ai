import { Inject, Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';

import { type Database, DbUserAchievement, userAchievement } from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

@Injectable()
export class AchievementsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database,
  ) {}

  /**
   * Intenta persistir el logro. Retorna true si es la primera vez que se desbloquea.
   */
  async unlock(userId: string, slug: string): Promise<boolean> {
    const result = await this.db
      .insert(userAchievement)
      .values({
        id: randomUUID(),
        userId,
        achievementSlug: slug,
        unlockedAt: new Date(),
      })
      .onConflictDoNothing({
        target: [userAchievement.userId, userAchievement.achievementSlug],
      })
      .returning();

    return result.length > 0;
  }

  async findAllByUserId(userId: string): Promise<DbUserAchievement[]> {
    return await this.db
      .select()
      .from(userAchievement)
      .where(eq(userAchievement.userId, userId));
  }
}
