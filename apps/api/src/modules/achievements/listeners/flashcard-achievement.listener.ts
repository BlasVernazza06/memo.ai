import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { AchievementsService } from '../service/achievements.service';

interface FlashcardCompletedPayload {
  userId: string;
  deckId: string;
  cardsCount: number;
  totalDecksCompleted: number;
  totalCardsReviewed: number;
}

@Injectable()
export class FlashcardAchievementListener {
  constructor(private readonly achievementsService: AchievementsService) {}

  @OnEvent('flashcard.completed')
  async handleFlashcardCompleted(payload: FlashcardCompletedPayload) {
    const { userId, totalDecksCompleted, totalCardsReviewed } = payload;

    // "Paso Iniciático" (1 mazo completado)
    await this.achievementsService.checkAndUnlock(
      userId,
      'first_deck',
      totalDecksCompleted >= 1,
    );

    // "Memoria de Elefante" (100 flashcards revisadas acumuladas)
    await this.achievementsService.checkAndUnlock(
      userId,
      'deck_100_cards',
      totalCardsReviewed >= 100,
    );
  }
}
