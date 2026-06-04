import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/modules/database/database.module';

import { AchievementsController } from './controllers/achievements.controller';
import { FlashcardAchievementListener } from './listeners/flashcard-achievement.listener';
import { QuizAchievementListener } from './listeners/quiz-achievement.listener';
import { StreakAchievementListener } from './listeners/streak-achievement.listener';
import { WorkspaceAchievementListener } from './listeners/workspace-achievement.listener';
import { AchievementsRepository } from './repositories/achievements.repository';
import { AchievementsService } from './service/achievements.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AchievementsController],
  providers: [
    AchievementsService,
    AchievementsRepository,
    FlashcardAchievementListener,
    QuizAchievementListener,
    StreakAchievementListener,
    WorkspaceAchievementListener,
  ],
  exports: [AchievementsService],
})
export class AchievementsModule {}
