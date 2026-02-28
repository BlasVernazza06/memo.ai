import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

import { type Database, plan, user } from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  // Cache en memoria para los planes (rara vez cambian)
  private plansCache: any[] | null = null;
  private plansCacheTimestamp = 0;
  private readonly PLANS_CACHE_TTL = 60 * 60 * 1000; // 1 hora en ms

  constructor(
    private configService: ConfigService,
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
  ) {
    const apiKey = this.configService.get<string>('stripe.secretKey');
    if (!apiKey) {
      console.warn('Stripe secret key is not set!');
    }
    this.stripe = new Stripe(apiKey ?? '', {
      apiVersion: '2025-01-27.acacia' as any,
    });
  }

  /**
   * Carga los planes desde la DB y los guarda en cache.
   */
  private async loadPlans(): Promise<any[]> {
    const now = Date.now();

    if (
      this.plansCache &&
      now - this.plansCacheTimestamp < this.PLANS_CACHE_TTL
    ) {
      return this.plansCache;
    }

    try {
      const plans = await (this.db as any).select().from(plan);
      this.plansCache = plans;
      this.plansCacheTimestamp = now;
      return plans;
    } catch (error) {
      console.error('Error loading plans:', error);
      throw error;
    }
  }

  /**
   * Invalida el cache de planes (llamar cuando se modifiquen los planes).
   */
  invalidatePlansCache() {
    this.plansCache = null;
    this.plansCacheTimestamp = 0;
  }

  /**
   * Obtiene la información de un plan específico por id o stripePriceId (usa cache).
   */
  async getPlanInfo(identifier: string) {
    const plans = await this.loadPlans();
    const dbPlan = plans.find(
      (p: any) => p.id === identifier || p.stripePriceId === identifier,
    );

    if (!dbPlan) {
      throw new NotFoundException(`El plan ${identifier} no existe`);
    }
    return dbPlan;
  }

  /**
   * Obtiene todos los planes disponibles (usa cache).
   */
  async getAllPlans() {
    return this.loadPlans();
  }

  /**
   * Genera una URL de Checkout de Stripe para el plan PRO.
   */
  async createCheckoutSession(
    userId: string,
    userEmail: string,
    planId: string = 'pro',
  ): Promise<string> {
    const dbUser = await (this.db as any).query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!dbUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Si el usuario ya tiene este plan, no permitimos duplicar
    if (dbUser.plan === planId) {
      throw new ForbiddenException(
        `Ya tienes una suscripción activa al plan ${planId}`,
      );
    }

    // Buscamos el plan en la DB para obtener el Price ID de Stripe
    const dbPlan = await this.getPlanInfo(planId);
    const priceId =
      dbPlan.stripePriceId ||
      this.configService.get<string>(`stripe.${planId}PriceId`);

    if (!priceId) {
      throw new BadRequestException(
        `El plan ${planId} no tiene un Price ID configurado en Stripe`,
      );
    }

    let stripeCustomerId = dbUser.stripeCustomerId;

    // Crear cliente en Stripe si no existe
    if (!stripeCustomerId) {
      const customer = await this.stripe.customers.create({
        email: userEmail,
        metadata: { userId },
      });
      stripeCustomerId = customer.id;

      await (this.db as any)
        .update(user)
        .set({ stripeCustomerId })
        .where(eq(user.id, userId));
    }

    const session = await this.stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: this.configService.get<string>('stripe.successUrl'),
      cancel_url: this.configService.get<string>('stripe.cancelUrl'),
      metadata: { userId, planId },
      subscription_data: {
        metadata: { userId, planId },
      },
    });

    return session.url!;
  }

  /**
   * Procesa los webhooks de Stripe para actualizar el estado de la suscripción.
   */
  async handleWebhook(signature: string, payload: Buffer) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.configService.get<string>('stripe.webhookSecret') ?? '',
      );
    } catch (err: any) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId || 'pro';
        const subscriptionId = session.subscription as string;

        if (userId) {
          await (this.db as any)
            .update(user)
            .set({
              plan: planId,
              stripeSubscriptionId: subscriptionId,
            })
            .where(eq(user.id, userId));
          console.log(`User ${userId} upgraded to ${planId}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const userId = subscription.metadata.userId;

        if (userId) {
          await (this.db as any)
            .update(user)
            .set({
              plan: 'free',
              stripeSubscriptionId: null,
            })
            .where(eq(user.id, userId));
          console.log(
            `User ${userId} subscription cancelled, reverted to Free plan`,
          );
        }
        break;
      }

      // Puedes añadir más eventos como 'invoice.payment_failed' para manejar errores de pago
    }

    return { received: true };
  }
}
