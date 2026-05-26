import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';

import { MockDataInterceptor } from '@/common/interceptors/mock-data.interceptor';
import configuration from '@/config/configuration';
import { envSchema } from '@/config/env.validation';
import { BetterAuthModule } from '@/core/auth/better-auth.module';
import { AchievementsModule } from '@/modules/achievements/achievements.module';
import { AiModule } from '@/modules/ai/ai.module';
import { CheckoutModule } from '@/modules/billing/checkout/checkout.module';
import { PlansModule } from '@/modules/billing/plans/plans.module';
import { WebhooksModule } from '@/modules/billing/webhooks/webhooks.module';
import { ChatsModule } from '@/modules/chats/chats.module';
import { DatabaseModule } from '@/modules/database/database.module';
import { EmailModule } from '@/modules/email/email.module';
import { FlashcardsModule } from '@/modules/flashcards/flashcards.module';
import { NotificationsModule } from '@/modules/notifications/notifications.module';
import { QuizzesModule } from '@/modules/quizzes/quizzes.module';
import { StreakModule } from '@/modules/streak/streak.module';
import { UsersModule } from '@/modules/users/users.module';
import { WorkspacesModule } from '@/modules/workspaces/workspaces.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate: (config) => envSchema.parse(config),
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    EmailModule,
    BetterAuthModule,
    UsersModule,
    AiModule,
    ChatsModule,
    WorkspacesModule,
    FlashcardsModule,
    QuizzesModule,
    StreakModule,
    PlansModule,
    AchievementsModule,
    NotificationsModule,
    CheckoutModule,
    WebhooksModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MockDataInterceptor,
    },
  ],
})
export class AppModule {}
