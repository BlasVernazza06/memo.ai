import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/modules/database/database.module';

import { AchievementsController } from './controllers/achievements.controller';
import { QuizAchievementListener } from './listeners/quiz-achievement.listener';
import { StreakAchievementListener } from './listeners/streak-achievement.listener';
import { AchievementsRepository } from './repositories/achievements.repository';
import { AchievementsService } from './service/achievements.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AchievementsController],
  providers: [
    AchievementsService,
    AchievementsRepository,
    QuizAchievementListener,
    StreakAchievementListener,
  ],
  exports: [AchievementsService],
})
export class AchievementsModule {}
