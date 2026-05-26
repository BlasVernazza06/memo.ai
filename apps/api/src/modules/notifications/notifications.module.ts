import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/modules/database/database.module';

import { NotificationsController } from './controllers/notifications.controller';
import { AchievementNotificationListener } from './listeners/achievement-notification.listener';
import { NotificationsRepository } from './repositories/notifications.repository';
import { NotificationsService } from './services/notifications.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationsRepository,
    AchievementNotificationListener,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
