import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { db, authSchema } from '@repo/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

@Injectable()
export class AuthService {
  public auth: ReturnType<typeof betterAuth>;

  constructor(private readonly configService: ConfigService) {
    this.auth = betterAuth({
      database: drizzleAdapter(db, {
        provider: 'pg',
        schema: authSchema,
      }),
      secret: this.configService.get<string>('BETTER_AUTH_SECRET')!,
      baseURL: this.configService.get<string>('BETTER_AUTH_URL')!,
      emailAndPassword: {
        enabled: true,
      },
    });
  }
}
