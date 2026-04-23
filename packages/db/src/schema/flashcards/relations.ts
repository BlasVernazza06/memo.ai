import { relations } from 'drizzle-orm';
import { flashcardDeck, flashcard } from './schema';
import { workspace } from '../workspaces/schema';

export const flashcardDeckRelations = relations(
  flashcardDeck,
  ({ one, many }) => ({
    workspace: one(workspace, {
      fields: [flashcardDeck.workspaceId],
      references: [workspace.id],
    }),
    flashcards: many(flashcard),
  }),
);

export const flashcardRelations = relations(flashcard, ({ one }) => ({
  deck: one(flashcardDeck, {
    fields: [flashcard.deckId],
    references: [flashcardDeck.id],
  }),
}));
