import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FlashcardsRepository } from '../repositories/flashcards.repository';

@Injectable()
export class FlashcardsService {
  constructor(
    private readonly flashcardsRepo: FlashcardsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findAllByUser(userId: string) {
    return await this.flashcardsRepo.findAllByUser(userId);
  }

  async findByWorkspace(userId: string, workspaceId: string) {
    return await this.flashcardsRepo.findByWorkspace(userId, workspaceId);
  }

  async findById(userId: string, deckId: string) {
    const deck = await this.flashcardsRepo.findById(userId, deckId);
    if (!deck || deck.workspace.userId !== userId) {
      throw new NotFoundException('Mazo no encontrado');
    }
    return deck;
  }

  async completeDeck(userId: string, deckId: string, cardsCount: number): Promise<any[]> {
    const deck = await this.flashcardsRepo.findById(userId, deckId);
    if (!deck) {
      throw new NotFoundException('Mazo no encontrado');
    }

    await this.flashcardsRepo.saveFlashcardSession(userId, deckId, cardsCount, deck.workspaceId);

    const newlyUnlocked: any[] = [];
    const tempListener = (event: any) => {
      if (event.userId === userId) {
        newlyUnlocked.push({
          slug: event.slug,
          title: event.title,
          icon: event.icon,
        });
      }
    };

    // Registrar listener temporal de logros
    this.eventEmitter.on('achievement.unlocked', tempListener);

    try {
      const totalDecksCompleted = await this.flashcardsRepo.countUserCompletedDecks(userId);
      const totalCardsReviewed = await this.flashcardsRepo.sumUserReviewedCards(userId);

      // Emitir el evento que evalúa los logros sincrónicamente
      await this.eventEmitter.emitAsync('flashcard.completed', {
        userId,
        deckId,
        cardsCount,
        totalDecksCompleted,
        totalCardsReviewed,
      });
    } finally {
      // Desregistrar
      this.eventEmitter.off('achievement.unlocked', tempListener);
    }

    return newlyUnlocked;
  }
}
