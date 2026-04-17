import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { AiModule } from '@/modules/ai/ai.module';
import { DatabaseModule } from '@modules/database/database.module';
import { StorageModule } from '@modules/storage/storage.module';
import { UsersModule } from '@modules/users/users.module';
import { WorkspacesController } from '@modules/workspaces/controllers/workspaces.controller';
import { WorkspacesRepository } from '@modules/workspaces/repositories/workspaces.repository';
import { WorkspacesService } from '@modules/workspaces/services/workspaces.service';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    StorageModule,
    AiModule,
    CacheModule.register(),
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService, WorkspacesRepository],
  exports: [WorkspacesService],
})
export class WorkspacesModule {}
