import {
  type InferInsertModel,
  type InferSelectModel,
} from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { workspace } from '../workspaces/schema';
import { user } from '../users/schema';

export const quiz = pgTable('quiz', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id')
    .notNull()
    .references(() => workspace.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  totalQuestions: integer('total_questions').default(0).notNull(),
  isAiGenerated: boolean('is_ai_generated').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbQuiz = InferSelectModel<typeof quiz>;
export type NewQuiz = InferInsertModel<typeof quiz>;

export const quizQuestion = pgTable('quiz_question', {
  id: text('id').primaryKey(),
  quizId: text('quiz_id')
    .notNull()
    .references(() => quiz.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  options: jsonb('options').notNull(),
  correctAnswer: integer('correct_answer').notNull(),
  explanation: text('explanation'),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type DbQuizQuestion = InferSelectModel<typeof quizQuestion>;
export type NewQuizQuestion = InferInsertModel<typeof quizQuestion>;

export const quizAttempt = pgTable('quiz_attempt', {
  id: text('id').primaryKey(),
  quizId: text('quiz_id')
    .notNull()
    .references(() => quiz.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  score: integer('score').notNull(),
  totalQuestions: integer('total_questions').notNull(),
  answers: jsonb('answers'),
  completedAt: timestamp('completed_at').defaultNow().notNull(),
});

export type DbQuizAttempt = InferSelectModel<typeof quizAttempt>;
export type NewQuizAttempt = InferInsertModel<typeof quizAttempt>;
