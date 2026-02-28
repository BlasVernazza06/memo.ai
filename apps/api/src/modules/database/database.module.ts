import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import {
  activitySchema,
  authSchema,
  chatSchema,
  planSchema,
  workspaceSchema,
} from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pg = neon(configService.getOrThrow('DATABASE_URL'));
        return drizzle(pg, {
          schema: {
            ...authSchema,
            ...workspaceSchema,
            ...activitySchema,
            ...chatSchema,
            ...planSchema,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
