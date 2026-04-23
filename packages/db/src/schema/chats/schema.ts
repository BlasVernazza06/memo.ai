import {
  type InferInsertModel,
  type InferSelectModel,
} from 'drizzle-orm';
import {
  jsonb,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { user } from '../users/schema';
import { workspace } from '../workspaces/schema';

export const chat = pgTable('chat', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  workspaceId: text('workspace_id').references(() => workspace.id, {
    onDelete: 'cascade',
  }),
  title: text('title'),
  type: text('type').default('creation').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbChat = InferSelectModel<typeof chat>;
export type NewChat = InferInsertModel<typeof chat>;

export const message = pgTable('message', {
  id: text('id').primaryKey(),
  chatId: text('chat_id')
    .notNull()
    .references(() => chat.id, { onDelete: 'cascade' }),
  role: text('role').notNull(),
  content: text('content').notNull(),
  attachments: jsonb('attachments'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type DbMessage = InferSelectModel<typeof message>;
export type NewMessage = InferInsertModel<typeof message>;
