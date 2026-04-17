import { Injectable, NotFoundException } from '@nestjs/common';
import { FlashcardsRepository } from '../repositories/flashcards.repository';

@Injectable()
export class FlashcardsService {
  constructor(private readonly flashcardsRepo: FlashcardsRepository) {}

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
}
