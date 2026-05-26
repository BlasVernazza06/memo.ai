import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { StreakService } from '../services/streak.service';

interface QuizCompletedPayload {
  userId: string;
  quizId: string;
  score: number;
  totalCompleted: number;
}

@Injectable()
export class StreakListener {
  constructor(private readonly streakService: StreakService) {}

  /**
   * Se ejecuta automáticamente cuando se emite el evento 'quiz.completed'.
   * Registra la actividad del usuario en la base de datos de rachas (streaks) de forma desacoplada.
   */
  @OnEvent('quiz.completed')
  async handleQuizCompleted(payload: QuizCompletedPayload) {
    const { userId } = payload;
    
    // Registramos la actividad del día de hoy en la racha del usuario
    await this.streakService.recordActivity(userId);
  }
}
