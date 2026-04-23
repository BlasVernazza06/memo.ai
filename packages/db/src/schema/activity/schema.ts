import {
  type InferInsertModel,
  type InferSelectModel,
} from 'drizzle-orm';
import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { user } from '../users/schema';
import { workspace } from '../workspaces/schema';

export const userActivity = pgTable('user_activity', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  workspaceId: text('workspace_id').references(() => workspace.id, {
    onDelete: 'cascade',
  }),
  type: text('type').notNull(),
  metadata: jsonb('metadata'),
  date: text('date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type DbUserActivity = InferSelectModel<typeof userActivity>;
export type NewUserActivity = InferInsertModel<typeof userActivity>;

export const notification = pgTable('notification', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  type: text('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  icon: text('icon'),
  metadata: jsonb('metadata'),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type DbNotification = InferSelectModel<typeof notification>;
export type NewNotification = InferInsertModel<typeof notification>;
