import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { QuizCardDTO, QuizDetailDTO } from '@modules/quizzes/dto/quiz.dto';
import { QuizzesRepository } from '@modules/quizzes/repositories/quizzes.repository';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly quizzesRepo: QuizzesRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findAllByUser(userId: string): Promise<QuizCardDTO[]> {
    return await this.quizzesRepo.findAllByUser(userId);
  }

  async findByWorkspace(
    userId: string,
    workspaceId: string,
  ): Promise<QuizCardDTO[]> {
    return await this.quizzesRepo.findByWorkspace(userId, workspaceId);
  }

  async findById(userId: string, quizId: string): Promise<QuizDetailDTO> {
    const foundQuiz = await this.quizzesRepo.findById(userId, quizId);
    if (!foundQuiz) {
      throw new NotFoundException('Quiz no encontrado');
    }
    return foundQuiz;
  }

  async completeQuiz(userId: string, quizId: string, score: number): Promise<any[]> {
    await this.quizzesRepo.saveQuizAttempt(userId, quizId, score);

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

    // Registrar listener temporal
    this.eventEmitter.on('achievement.unlocked', tempListener);

    try {
      // Emitir el evento que evalúa los logros sincrónicamente
      await this.eventEmitter.emitAsync('quiz.completed', {
        userId,
        quizId,
        score,
        totalCompleted: await this.quizzesRepo.countUserCompletedQuizzes(userId),
      });
    } finally {
      // Desregistrar para evitar pérdidas de memoria
      this.eventEmitter.off('achievement.unlocked', tempListener);
    }

    return newlyUnlocked;
  }
}
