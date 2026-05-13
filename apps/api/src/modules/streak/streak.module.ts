import { Module } from '@nestjs/common';
import { StreakController } from './controllers/streak.controller';
import { StreakService } from './services/streak.service';
import { StreakRepository } from './repositories/streak.repository';
import { DatabaseModule } from '@/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StreakController],
  providers: [StreakService, StreakRepository],
  exports: [StreakService],
})
export class StreakModule {}
