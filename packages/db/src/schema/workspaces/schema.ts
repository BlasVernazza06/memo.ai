import {
  type InferInsertModel,
  type InferSelectModel,
} from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { user } from '../users/schema';

export const workspace = pgTable('workspace', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  customContext: text('custom_context'),
  category: text('category'),
  icon: text('icon'),
  coverImage: text('cover_image'),
  isFavorite: boolean('is_favorite').default(false).notNull(),
  isArchived: boolean('is_archived').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbWorkspace = InferSelectModel<typeof workspace>;
export type NewWorkspace = InferInsertModel<typeof workspace>;

export const document = pgTable('document', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id')
    .notNull()
    .references(() => workspace.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: text('type').notNull(),
  url: text('url').notNull(),
  key: text('key'),
  sizeBytes: integer('size_bytes'),
  status: text('status').default('pending').notNull(),
  generateFlashcards: boolean('generate_flashcards').default(true).notNull(),
  generateQuizzes: boolean('generate_quizzes').default(true).notNull(),
  generateSummary: boolean('generate_summary').default(true).notNull(),
  aiSummary: text('ai_summary'),
  thumbnailUrl: text('thumbnail_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbDocument = InferSelectModel<typeof document>;
export type NewDocument = InferInsertModel<typeof document>;
