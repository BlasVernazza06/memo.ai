import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  type RawBodyRequest,
  Req,
} from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

import { Request } from 'express';

import { WebhooksService } from '../services/webhooks.service';

@AllowAnonymous()
@Controller('billing/webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get('test-pago/:userId')
  async testPago(@Param('userId') userId: string) {
    return this.webhooksService.handleTestPago(userId);
  }

  @Post()
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: RawBodyRequest<Request>,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    if (!request.rawBody) {
      throw new BadRequestException(
        'Raw body is missing. Ensure NestJS is configured with rawBody: true',
      );
    }

    return this.webhooksService.handleWebhook(signature, request.rawBody);
  }
}
