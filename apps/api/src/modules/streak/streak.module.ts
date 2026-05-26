import { Module } from '@nestjs/common';
import { StreakController } from './controllers/streak.controller';
import { StreakService } from './services/streak.service';
import { StreakRepository } from './repositories/streak.repository';
import { DatabaseModule } from '@/modules/database/database.module';
import { StreakListener } from './listeners/streak.listener';

@Module({
  imports: [DatabaseModule],
  controllers: [StreakController],
  providers: [StreakService, StreakRepository, StreakListener],
  exports: [StreakService],
})
export class StreakModule {}
