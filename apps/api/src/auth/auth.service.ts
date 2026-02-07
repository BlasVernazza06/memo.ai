import { Injectable } from '@nestjs/common';
import { db, authSchema } from '@repo/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

@Injectable()
export class AuthService {
  public auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: authSchema,
    }),
    emailAndPassword: {
      enabled: true,
    },
  });
}
