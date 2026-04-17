import { Module } from '@nestjs/common';
import { FlashcardsController } from './controllers/flashcards.controller';
import { FlashcardsService } from './services/flashcards.service';
import { FlashcardsRepository } from './repositories/flashcards.repository';
import { DatabaseModule } from '@/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FlashcardsController],
  providers: [FlashcardsService, FlashcardsRepository],
  exports: [FlashcardsService],
})
export class FlashcardsModule {}
