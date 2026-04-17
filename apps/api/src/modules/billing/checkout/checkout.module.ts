import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersModule } from '@/modules/users/users.module';

import { PlansModule } from '../plans/plans.module';
import { CheckoutController } from './controllers/checkout.controller';
import { CheckoutService } from './services/checkout.service';

@Module({
  imports: [PlansModule, UsersModule],
  controllers: [CheckoutController],
  providers: [
    CheckoutService,
    {
      provide: 'STRIPE_SECRET_KEY',
      useFactory: (config: ConfigService) =>
        config.getOrThrow<string>('stripe.secretKey'),
      inject: [ConfigService],
    },
  ],
})
export class CheckoutModule {}
