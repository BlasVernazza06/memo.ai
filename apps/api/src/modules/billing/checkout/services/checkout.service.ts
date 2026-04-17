import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Stripe from 'stripe';

import { UsersService } from '@/modules/users/services/users.service';

import { PlansService } from '../../plans/services/plans.service';

@Injectable()
export class CheckoutService {
  private stripe: Stripe;

  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly plansService: PlansService,
    @Inject('STRIPE_SECRET_KEY') private readonly token: string,
  ) {
    this.stripe = new Stripe(this.token, {
      apiVersion: '2026-02-25.clover',
    });
  }

  async createCheckoutSession(userId: string, stripe_priceId: string) {
    const user = await this.userService.getUser(userId);
    // 1. Validar que el plan existe (buscando por el ID de precio de Stripe que envía el front)
    const plan = await this.plansService.findByStripePriceId(stripe_priceId);
    if (!plan) {
      throw new NotFoundException('Plan no encontrado');
    }

    // 2. Crear sesión de Stripe
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId as string,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${this.configService.get('auth.appUrl')}/dashboard?payment=success`,
      cancel_url: `${this.configService.get('auth.appUrl')}/`,
      metadata: {
        userId,
        stripe_priceId,
      },
    };

    if (user.stripeCustomerId) {
      sessionPayload.customer = user.stripeCustomerId;
    } else {
      sessionPayload.customer_email = user.email;
    }

    const session = await this.stripe.checkout.sessions.create(sessionPayload);

    // --- MODO PRUEBA / DESARROLLO ---
    console.log('[DEBUG] Iniciando updateBillingInfo para:', userId);
    try {
      await this.userService.updateBillingInfo(userId, {
        plan: 'pro',
        stripeSubscriptionStatus: 'active',
        stripePriceId: plan.stripePriceId ?? undefined,
        stripeCustomerId:
          user.stripeCustomerId ||
          (session.customer as string) ||
          'cus_preview',
        stripeSubscriptionId:
          (session.subscription as string) || 'sub_preview_manual',
      });
      console.log('[DEBUG] updateBillingInfo completado con éxito');

      const updatedUser = await this.userService.getUser(userId);
      console.log(
        '[DEBUG] Usuario post-actualización en DB:',
        JSON.stringify(
          {
            id: updatedUser.id,
            plan: updatedUser.plan,
            status: updatedUser.stripeSubscriptionStatus,
            stripeId: updatedUser.stripeCustomerId,
          },
          null,
          2,
        ),
      );
    } catch (error) {
      console.error('[DEBUG] Error en updateBillingInfo:', error);
    }

    return { url: session.url };
  }
}
