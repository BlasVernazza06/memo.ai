import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';

import { user } from '../users/schema';

// Importa tu tabla de usuarios

export const userAchievement = pgTable(
  'user_achievement',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    achievementSlug: text('achievement_slug').notNull(),
    unlockedAt: timestamp('unlocked_at').defaultNow().notNull(),
  },
  (t) => [
    // Clave única compuesta: Impide registrar el mismo logro dos veces al mismo usuario
    unique('user_achievement_user_slug_unique').on(t.userId, t.achievementSlug),
  ],
);

export type DbUserAchievement = InferSelectModel<typeof userAchievement>;
export type NewUserAchievement = InferInsertModel<typeof userAchievement>;
