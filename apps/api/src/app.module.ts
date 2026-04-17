import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import configuration from '@/config/configuration';
import { envSchema } from '@/config/env.validation';
import { BetterAuthModule } from '@/core/auth/better-auth.module';
import { AiModule } from '@/modules/ai/ai.module';
import { CheckoutModule } from '@/modules/billing/checkout/checkout.module';
import { PlansModule } from '@/modules/billing/plans/plans.module';
import { WebhooksModule } from '@/modules/billing/webhooks/webhooks.module';
import { ChatsModule } from '@/modules/chats/chats.module';
import { DatabaseModule } from '@/modules/database/database.module';
import { UsersModule } from '@/modules/users/users.module';
import { WorkspacesModule } from '@/modules/workspaces/workspaces.module';
import { FlashcardsModule } from '@/modules/flashcards/flashcards.module';
import { QuizzesModule } from '@/modules/quizzes/quizzes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate: (config) => envSchema.parse(config),
      isGlobal: true,
    }),
    DatabaseModule,
    BetterAuthModule,
    UsersModule,
    AiModule,
    ChatsModule,
    WorkspacesModule,
    FlashcardsModule,
    QuizzesModule,
    PlansModule,
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
  providers: [],
})
export class AppModule {}
