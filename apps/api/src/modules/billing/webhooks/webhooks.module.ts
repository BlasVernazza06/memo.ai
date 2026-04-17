import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersModule } from '@/modules/users/users.module';

import { WebhooksController } from './controllers/webhooks.controller';
import { WebhooksService } from './services/webhooks.service';

@Module({
  imports: [UsersModule],
  controllers: [WebhooksController],
  providers: [
    WebhooksService,
    {
      provide: 'STRIPE_SECRET_KEY',
      useFactory: (config: ConfigService) =>
        config.getOrThrow<string>('stripe.secretKey'),
      inject: [ConfigService],
    },
    {
      provide: 'STRIPE_WEBHOOK_SECRET',
      useFactory: (config: ConfigService) =>
        config.getOrThrow<string>('stripe.webhookSecret'),
      inject: [ConfigService],
    },
  ],
})
export class WebhooksModule {}
