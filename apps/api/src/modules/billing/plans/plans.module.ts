import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/modules/database/database.module';

import { PlansController } from './controllers/plans.controller';
import { PlansRepository } from './respository/plans.repository';
import { PlansService } from './services/plans.service';

@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [PlansController],
  providers: [PlansService, PlansRepository],
  exports: [PlansService],
})
export class PlansModule {}
