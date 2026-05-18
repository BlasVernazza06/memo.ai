import { Injectable, NotFoundException } from '@nestjs/common';

import { QuizCardDTO, QuizDetailDTO } from '@modules/quizzes/dto/quiz.dto';
import { QuizzesRepository } from '@modules/quizzes/repositories/quizzes.repository';

@Injectable()
export class QuizzesService {
  constructor(private readonly quizzesRepo: QuizzesRepository) {}

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
}
