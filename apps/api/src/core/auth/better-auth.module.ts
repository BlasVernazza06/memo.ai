import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard, AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as cacheManager from 'cache-manager';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

import { authSchema } from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';
import { DatabaseModule } from '@/modules/database/database.module';
import { EmailModule } from '@/modules/email/email.module';
import { EmailService } from '@/modules/email/service/email.service';

@Module({
  imports: [
    AuthModule.forRootAsync({
      imports: [
        DatabaseModule,
        ConfigModule,
        EmailModule,
        CacheModule.register(),
      ],
      useFactory: (
        database: NeonHttpDatabase,
        configService: ConfigService,
        emailService: EmailService,
        cache: cacheManager.Cache,
      ) => {
        const auth = betterAuth({
          database: drizzleAdapter(database, {
            provider: 'pg',
            schema: authSchema,
          }),
          emailAndPassword: {
            enabled: true,
            async sendResetPassword({ user, url }) {
              await emailService.sendResetPasswordEmail(user.email, url);
            },
          },
          emailVerification: {
            sendOnSignUp: true,
            async sendVerificationEmail({ user, url }) {
              await emailService.sendVerificationEmail(user.email, url);
            },
          },
          socialProviders: {
            google: {
              clientId: configService.get('auth.google.clientId') || '',
              clientSecret: configService.get('auth.google.clientSecret') || '',
            },
            github: {
              clientId: configService.get('auth.github.clientId') || '',
              clientSecret: configService.get('auth.github.clientSecret') || '',
            },
          },
          user: {
            additionalFields: {
              plan: {
                type: 'string',
                defaultValue: 'free',
                input: false,
              },
              stripeCustomerId: { type: 'string', input: false },
              stripeSubscriptionId: { type: 'string', input: false },
              stripeSubscriptionStatus: { type: 'string', input: false },
              stripePriceId: { type: 'string', input: false },
            },
          },
          trustedOrigins: [configService.getOrThrow('NEXT_PUBLIC_APP_URL')],
          hooks: {
            after: async (context) => {
              const ctx = context as any;
              
              if (ctx.path?.includes('/update-user') && (!ctx.response || ctx.response.ok)) {
                // Use the session that is already in context instead of fetching it again
                const session = ctx.context?.session;
                console.log('[BetterAuth Hook] Update User Triggered', { userId: session?.user?.id });
                if (session?.user?.id) {
                  await cache.del(`user:profile:${session.user.id}`);
                  console.log(`[BetterAuth Hook] Deleted cache for user:profile:${session.user.id}`);
                }
              }
              return context;
            },
          },
        });

        return { auth };
      },
      inject: [DATABASE_CONNECTION, ConfigService, EmailService, CACHE_MANAGER],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthModule],
})
export class BetterAuthModule {}
