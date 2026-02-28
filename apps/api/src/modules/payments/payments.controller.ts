import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  AllowAnonymous,
  AuthGuard,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * Lista todos los planes disponibles.
   * Cache: 1h en browser, stale-while-revalidate por 24h.
   */
  @Get('plans')
  @AllowAnonymous()
  @Header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  async getAllPlans() {
    return this.paymentsService.getAllPlans();
  }

  @Get('plan/:priceId')
  @UseGuards(AuthGuard)
  @Header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  async getPlanInfo(@Param('priceId') priceId: string) {
    return this.paymentsService.getPlanInfo(priceId);
  }

  /**
   * Obtiene la URL de checkout para un plan.
   */
  @Get('checkout/:priceId')
  @UseGuards(AuthGuard)
  async getPlanCheckout(
    @Session() session: UserSession,
    @Param('priceId') priceId: string,
  ): Promise<{ url: string }> {
    const url = await this.paymentsService.createCheckoutSession(
      session.user.id,
      session.user.email,
      priceId,
    );
    return { url };
  }

  /**
   * Endpoint para crear la sesión de Checkout.
   * Requiere autenticación.
   */
  @Post('checkout')
  @UseGuards(AuthGuard)
  async createCheckout(
    @Session() session: UserSession,
  ): Promise<{ url: string }> {
    const url = await this.paymentsService.createCheckoutSession(
      session.user.id,
      session.user.email,
    );
    return { url };
  }

  /**
   * Endpoint para los Webhooks de Stripe.
   * No requiere AuthGuard ya que Stripe se autentica con la firma del webhook.
   */
  @Post('webhook')
  @AllowAnonymous()
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: Request,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    // Nota: Necesitamos acceder al cuerpo crudo (Buffer) del request para verificar la firma de Stripe.
    // Asegúrate de tener `rawBody: true` en la configuración de NestFactory.create() en main.ts.
    const rawBody = (request as any).rawBody as Buffer;

    if (!rawBody) {
      throw new BadRequestException(
        'Raw body is missing! Check your configuration.',
      );
    }

    return this.paymentsService.handleWebhook(signature, rawBody);
  }
}
