import { relations } from 'drizzle-orm';
import { workspace, document } from './schema';
import { user } from '../users/schema';
import { flashcardDeck } from '../flashcards/schema';
import { quiz } from '../quizzes/schema';
import { chat } from '../chats/schema';
import { userActivity } from '../activity/schema';

export const workspaceRelations = relations(workspace, ({ one, many }) => ({
  user: one(user, { fields: [workspace.userId], references: [user.id] }),
  documents: many(document),
  flashcardDecks: many(flashcardDeck),
  quizzes: many(quiz),
  chats: many(chat),
  activities: many(userActivity),
}));

export const documentRelations = relations(document, ({ one }) => ({
  workspace: one(workspace, {
    fields: [document.workspaceId],
    references: [workspace.id],
  }),
}));
