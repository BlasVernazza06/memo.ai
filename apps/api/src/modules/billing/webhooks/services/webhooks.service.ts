import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import Stripe from 'stripe';
import { UsersService } from '@/modules/users/services/users.service';

@Injectable()
export class WebhooksService {
  private stripe: Stripe;
  private readonly logger = new Logger(WebhooksService.name);

  constructor(
    @Inject('STRIPE_SECRET_KEY') private readonly apiKey: string,
    @Inject('STRIPE_WEBHOOK_SECRET') private readonly webhookSecret: string,
    private readonly userService: UsersService,
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2026-02-25.clover',
    });
  }

  async handleTestPago(userId: string) {
    this.logger.warn(`--- SIMULANDO PAGO MANUAL PARA USUARIO: ${userId} ---`);
    await this.userService.updateBillingInfo(userId, {
      plan: 'pro',
      stripeCustomerId: 'cus_test_manual',
      stripeSubscriptionId: 'sub_test_manual',
      stripeSubscriptionStatus: 'active',
      stripePriceId: 'price_manual',
    });
    return { message: 'Pago simulado con éxito. Revisa tu DB.' };
  }

  async handleWebhook(signature: string, rawBody: Buffer) {
    this.logger.log('--- NUEVO WEBHOOK RECIBIDO ---');
    this.logger.log(`Signature presente: ${!!signature}`);
    this.logger.log(`Tamaño del body: ${rawBody.length} bytes`);

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        this.webhookSecret,
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(`Webhook signature verification failed: ${errorMessage}`);
      throw new BadRequestException(`Webhook Error: ${errorMessage}`);
    }

    this.logger.log(`Received event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await this.handleCheckoutSessionCompleted(session);
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await this.handleSubscriptionUpdated(subscription);
        break;
      }
    }

    return { received: true };
  }

  private async handleCheckoutSessionCompleted(
    session: Stripe.Checkout.Session,
  ) {
    const userId = session.metadata?.userId;

    if (!userId) {
      this.logger.warn('No userId found in session metadata');
      return;
    }

    this.logger.log(`Updating billing info for user ${userId}`);

    await this.userService.updateBillingInfo(userId, {
      plan: 'pro',
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: session.subscription as string,
      stripeSubscriptionStatus:
        session.status === 'complete' ? 'active' : (session.status ?? undefined),
      stripePriceId: session.metadata?.planId ?? undefined,
    });
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;
    
    // Aquí necesitaríamos buscar al usuario por stripeCustomerId
    // Para simplificar esta tutoría, asumiremos que el estado se sincroniza
    // Pero en un sistema real, buscaríamos al user en la DB por su customerId
    this.logger.log(`Subscription ${subscription.id} status: ${subscription.status}`);
  }
}
