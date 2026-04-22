import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard, AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

import { authSchema } from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';
import { DatabaseModule } from '@/modules/database/database.module';
import { EmailModule } from '@/modules/email/email.module';
import { EmailService } from '@/modules/email/service/email.service';

@Module({
  imports: [
    AuthModule.forRootAsync({
      imports: [DatabaseModule, ConfigModule, EmailModule],
      useFactory: (
        database: NeonHttpDatabase,
        configService: ConfigService,
        emailService: EmailService,
      ) => ({
        auth: betterAuth({
          database: drizzleAdapter(database, {
            provider: 'pg',
            schema: authSchema,
          }),
          emailAndPassword: {
            enabled: true,
            sendResetPassword: async ({ user, url }) => {
              await emailService.sendResetPasswordEmail(user.email, url);
            },
            sendVerificationEmail: async ({ user, url }) => {
              await emailService.sendVerificationEmail(user.email, url);
            },
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
        }),
      }),
      inject: [DATABASE_CONNECTION, ConfigService, EmailService],
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
