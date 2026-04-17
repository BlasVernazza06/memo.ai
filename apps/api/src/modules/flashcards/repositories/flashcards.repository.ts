import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import {
  type Database,
  flashcardDeck,
  workspace,
} from '@repo/db';
import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

@Injectable()
export class FlashcardsRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAllByUser(userId: string) {
    return await this.db.query.flashcardDeck.findMany({
      where: (deck, { exists }) =>
        exists(
          this.db
            .select()
            .from(workspace)
            .where(
              and(
                eq(workspace.id, deck.workspaceId),
                eq(workspace.userId, userId)
              )
            )
        ),
      with: {
        flashcards: true,
        workspace: {
            columns: {
                name: true,
                id: true,
            }
        }
      },
    });
  }

  async findByWorkspace(userId: string, workspaceId: string) {
    return await this.db.query.flashcardDeck.findMany({
      where: eq(flashcardDeck.workspaceId, workspaceId),
      with: {
        flashcards: true,
      },
    });
  }

  async findById(userId: string, deckId: string) {
    return await this.db.query.flashcardDeck.findFirst({
      where: eq(flashcardDeck.id, deckId),
      with: {
        flashcards: true,
        workspace: true,
      },
    });
  }
}
