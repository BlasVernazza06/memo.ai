import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '@/config/configuration';
import { envSchema } from '@/config/env.validation';
import { BetterAuthModule } from '@/core/auth/better-auth.module';
import { AiModule } from '@/modules/ai/ai.module';
import { ChatsModule } from '@/modules/chats/chats.module';
import { DatabaseModule } from '@/modules/database/database.module';
import { PaymentsModule } from '@/modules/payments/payments.module';
import { UsersModule } from '@/modules/users/users.module';
import { WorkspacesModule } from '@/modules/workspaces/workspaces.module';

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
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
