export * from './users';
export * from './plans';
export * from './workspaces';
export * from './flashcards';
export * from './quizzes';
export * from './activity';
export * from './chats';

import { DbUser } from './users';
import { DbWorkspace, DbDocument } from './workspaces';
import { DbFlashcardDeck, DbFlashcard } from './flashcards';
import { DbQuiz, DbQuizQuestion, DbQuizAttempt } from './quizzes';
import { ChatWithMessages } from './chats';
import { DbUserActivity } from './activity';

// ============================================================
// RELATION TYPES (DEEP)
// ============================================================

export type FlashcardDeckWithCards = DbFlashcardDeck & {
  flashcards: DbFlashcard[];
};

export type QuizWithQuestions = DbQuiz & {
  questions: DbQuizQuestion[];
  attempts?: DbQuizAttempt[];
};

export type WorkspaceWithRelations = DbWorkspace & {
  documents: DbDocument[];
  flashcardDecks: FlashcardDeckWithCards[];
  quizzes: QuizWithQuestions[];
  user?: DbUser;
  chats?: ChatWithMessages[];
  activities?: DbUserActivity[];
};

// ============================================================
// SCHEMA GROUPS
// ============================================================

import * as users from './users';
import * as plans from './plans';
import * as workspaces from './workspaces';
import * as flashcards from './flashcards';
import * as quizzes from './quizzes';
import * as activity from './activity';
import * as chats from './chats';

export const workspaceSchema = {
  workspace: workspaces.workspace,
  document: workspaces.document,
  flashcardDeck: flashcards.flashcardDeck,
  flashcard: flashcards.flashcard,
  quiz: quizzes.quiz,
  quizQuestion: quizzes.quizQuestion,
  quizAttempt: quizzes.quizAttempt,
  workspaceRelations: workspaces.workspaceRelations,
  documentRelations: workspaces.documentRelations,
  flashcardDeckRelations: flashcards.flashcardDeckRelations,
  flashcardRelations: flashcards.flashcardRelations,
  quizRelations: quizzes.quizRelations,
  quizQuestionRelations: quizzes.quizQuestionRelations,
  quizAttemptRelations: quizzes.quizAttemptRelations,
};

export const activitySchema = {
  userActivity: activity.userActivity,
  notification: activity.notification,
  userActivityRelations: activity.userActivityRelations,
  notificationRelations: activity.notificationRelations,
};

export const chatSchema = {
  chat: chats.chat,
  message: chats.message,
  chatRelations: chats.chatRelations,
  messageRelations: chats.messageRelations,
};

export const authSchema = {
  user: users.user,
  session: users.session,
  account: users.account,
  verification: users.verification,
  userRelations: users.userRelations,
  sessionRelations: users.sessionRelations,
  accountRelations: users.accountRelations,
};

export const planSchema = {
  plan: plans.plan,
};
