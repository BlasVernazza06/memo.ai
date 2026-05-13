import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { type Database, streaks } from '@repo/db';
import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

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
}
