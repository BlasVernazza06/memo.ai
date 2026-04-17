import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@thallesp/nestjs-better-auth';

import { User } from '@/common/decorators/user.decorator';

import { CreateCheckoutDto } from '../dto/checkout.dto';
import { CheckoutService } from '../services/checkout.service';

@Controller('checkout')
@UseGuards(AuthGuard)
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('create-session')
  async createSession(
    @User() user: { id: string },
    @Body() dto: CreateCheckoutDto,
  ) {
    return this.checkoutService.createCheckoutSession(
      user.id,
      dto.planId,
    );
  }
}
