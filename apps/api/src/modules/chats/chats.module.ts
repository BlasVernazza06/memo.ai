import { Module } from '@nestjs/common';

import { AiModule } from '@/modules/ai/ai.module';
import { DatabaseModule } from '@/modules/database/database.module';
import { StorageModule } from '@/modules/storage/storage.module';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [DatabaseModule, AiModule, StorageModule],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
