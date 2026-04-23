import { relations } from 'drizzle-orm';
import { quiz, quizQuestion, quizAttempt } from './schema';
import { workspace } from '../workspaces/schema';
import { user } from '../users/schema';

export const quizRelations = relations(quiz, ({ one, many }) => ({
  workspace: one(workspace, {
    fields: [quiz.workspaceId],
    references: [workspace.id],
  }),
  questions: many(quizQuestion),
  attempts: many(quizAttempt),
}));

export const quizQuestionRelations = relations(quizQuestion, ({ one }) => ({
  quiz: one(quiz, { fields: [quizQuestion.quizId], references: [quiz.id] }),
}));

export const quizAttemptRelations = relations(quizAttempt, ({ one }) => ({
  quiz: one(quiz, { fields: [quizAttempt.quizId], references: [quiz.id] }),
  user: one(user, { fields: [quizAttempt.userId], references: [user.id] }),
}));
