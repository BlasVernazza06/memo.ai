import { Inject, Injectable } from '@nestjs/common';

import { and, eq, ilike, or, sql } from 'drizzle-orm';

import { type Database, flashcard, flashcardDeck, workspace } from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

@Injectable()
export class FlashcardsRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAllByUser(userId: string) {
    const data = await this.db
      .select({
        id: flashcardDeck.id,
        name: flashcardDeck.name,
        description: flashcardDeck.description,
        color: flashcardDeck.color,
        workspaceId: flashcardDeck.workspaceId,
        createdAt: flashcardDeck.createdAt,
        cardsCount: sql<number>`count(${flashcard.id})`.mapWith(Number),
        workspace: {
          id: workspace.id,
          name: workspace.name,
        },
      })
      .from(flashcardDeck)
      .innerJoin(workspace, eq(flashcardDeck.workspaceId, workspace.id))
      .leftJoin(flashcard, eq(flashcardDeck.id, flashcard.deckId))
      .where(eq(workspace.userId, userId))
      .groupBy(flashcardDeck.id, workspace.id, workspace.name);

    return data;
  }

  async findByWorkspace(userId: string, workspaceId: string) {
    const data = await this.db
      .select({
        id: flashcardDeck.id,
        name: flashcardDeck.name,
        description: flashcardDeck.description,
        color: flashcardDeck.color,
        workspaceId: flashcardDeck.workspaceId,
        createdAt: flashcardDeck.createdAt,
        cardsCount: sql<number>`count(${flashcard.id})`.mapWith(Number),
        workspace: {
          id: workspace.id,
          name: workspace.name,
        },
      })
      .from(flashcardDeck)
      .innerJoin(workspace, eq(flashcardDeck.workspaceId, workspace.id))
      .leftJoin(flashcard, eq(flashcardDeck.id, flashcard.deckId))
      .where(
        and(
          eq(workspace.userId, userId),
          or(
            eq(flashcardDeck.workspaceId, workspaceId),
            ilike(flashcardDeck.workspaceId, `${workspaceId}%`),
          ),
        ),
      )
      .groupBy(flashcardDeck.id, workspace.id, workspace.name);

    return data;
  }

  async findById(userId: string, deckId: string) {
    const [deck] = await this.db
      .select({
        id: flashcardDeck.id,
        name: flashcardDeck.name,
        description: flashcardDeck.description,
        color: flashcardDeck.color,
        workspaceId: flashcardDeck.workspaceId,
        createdAt: flashcardDeck.createdAt,
        workspace: {
          id: workspace.id,
          name: workspace.name,
          userId: workspace.userId,
        },
      })
      .from(flashcardDeck)
      .innerJoin(workspace, eq(flashcardDeck.workspaceId, workspace.id))
      .where(
        and(
          eq(workspace.userId, userId),
          or(
            eq(flashcardDeck.id, deckId),
            ilike(flashcardDeck.id, `${deckId}%`),
          ),
        ),
      )
      .limit(1);

    if (!deck) return undefined;

    const cards = await this.db
      .select()
      .from(flashcard)
      .where(eq(flashcard.deckId, deck.id));

    return {
      ...deck,
      flashcards: cards,
    };
  }
}
