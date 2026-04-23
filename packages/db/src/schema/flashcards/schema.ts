import {
  type InferInsertModel,
  type InferSelectModel,
} from 'drizzle-orm';
import {
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { workspace } from '../workspaces/schema';

export const flashcardDeck = pgTable('flashcard_deck', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id')
    .notNull()
    .references(() => workspace.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  color: text('color'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbFlashcardDeck = InferSelectModel<typeof flashcardDeck>;
export type NewFlashcardDeck = InferInsertModel<typeof flashcardDeck>;

export const flashcard = pgTable('flashcard', {
  id: text('id').primaryKey(),
  deckId: text('deck_id')
    .notNull()
    .references(() => flashcardDeck.id, { onDelete: 'cascade' }),
  front: text('front').notNull(),
  back: text('back').notNull(),
  mastery: integer('mastery').default(0).notNull(),
  nextReview: timestamp('next_review'),
  reviewCount: integer('review_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbFlashcard = InferSelectModel<typeof flashcard>;
export type NewFlashcard = InferInsertModel<typeof flashcard>;
