import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from '../users/schema';

export const streaks = pgTable('streaks', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' })
    .unique(),
  currentStreak: integer('current_streak').default(0).notNull(),
  maxStreak: integer('max_streak').default(0).notNull(),
  lastActivity: timestamp('last_activity').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbStreake = InferSelectModel<typeof streaks>;
export type NewStreake = InferInsertModel<typeof streaks>;
