import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { AchievementsService } from '../service/achievements.service';

interface QuizCompletedPayload {
  userId: string;
  quizId: string;
  score: number;
  totalCompleted: number;
}

@Injectable()
export class QuizAchievementListener {
  constructor(private readonly achievementsService: AchievementsService) {}

  @OnEvent('quiz.completed')
  async handleQuizCompleted(payload: QuizCompletedPayload) {
    const { userId, totalCompleted } = payload;

    // "Primera Victoria" (1 quiz o más)
    await this.achievementsService.checkAndUnlock(
      userId,
      'first_quiz',
      totalCompleted >= 1,
    );

    // "Sabio Frecuente" (10 quizzes o más)
    await this.achievementsService.checkAndUnlock(
      userId,
      'quiz_10',
      totalCompleted >= 10,
    );
  }
}
