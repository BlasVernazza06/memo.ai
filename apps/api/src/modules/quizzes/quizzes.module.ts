import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/modules/database/database.module';

import { QuizzesController } from './controllers/quizzes.controller';
import { QuizzesRepository } from './repositories/quizzes.repository';
import { QuizzesService } from './services/quizzes.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizzesRepository],
  exports: [QuizzesService],
})
export class QuizzesModule {}
