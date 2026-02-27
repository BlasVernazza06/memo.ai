import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard, AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

import { authSchema } from '@repo/db';

import { AiModule } from '@/ai/ai.module';
import { UsersModule } from '@/core/users/users.module';
import { DATABASE_CONNECTION } from '@/database/database-connection';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule.forRootAsync({
      imports: [DatabaseModule, ConfigModule],
      useFactory: (
        database: NeonHttpDatabase,
        configService: ConfigService,
      ) => ({
        auth: betterAuth({
          database: drizzleAdapter(database, {
            provider: 'pg',
            schema: authSchema,
          }),
          emailAndPassword: {
            enabled: true,
          },
          socialProviders: {
            google: {
              clientId: configService.get('GOOGLE_CLIENT_ID') || '',
              clientSecret: configService.get('GOOGLE_CLIENT_SECRET') || '',
            },
            github: {
              clientId: configService.get('GITHUB_CLIENT_ID') || '',
              clientSecret: configService.get('GITHUB_CLIENT_SECRET') || '',
            },
          },
          trustedOrigins: [configService.getOrThrow('NEXT_PUBLIC_APP_URL')],
          plugins: [nextCookies()],
        }),
      }),
      inject: [DATABASE_CONNECTION, ConfigService],
    }),
    UsersModule,
    AiModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
