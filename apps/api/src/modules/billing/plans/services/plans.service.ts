import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import * as cacheManager from 'cache-manager';

import { type DbPlan } from '@repo/db';

import { PlansRepository } from '../respository/plans.repository';

@Injectable()
export class PlansService {
  constructor(
    private readonly plansRepo: PlansRepository,
    @Inject(CACHE_MANAGER) private cacheManager: cacheManager.Cache,
  ) {}

  async findAll(): Promise<DbPlan[]> {
    const cacheKey = `plans:list`;

    const cachedPlans = await this.cacheManager.get<DbPlan[]>(cacheKey);
    if (cachedPlans) {
      return cachedPlans;
    }

    const plans = await this.plansRepo.findAll();

    await this.cacheManager.set(cacheKey, plans, 1800);

    return plans;
  }

  async findById(idOrPriceId: string): Promise<DbPlan> {
    const cacheKey = `plan:smart:${idOrPriceId}`;

    const cached = await this.cacheManager.get<DbPlan>(cacheKey);
    if (cached) {
      return cached;
    }

    // Intentamos buscar primero por ID de base de datos
    let planFound = await this.plansRepo.findById(idOrPriceId);

    // Si no se encuentra, intentamos buscar por ID de Stripe
    if (!planFound) {
      planFound = await this.plansRepo.findByStripePriceId(idOrPriceId);
    }

    if (!planFound) {
      throw new NotFoundException('Plan no encontrado');
    }

    await this.cacheManager.set(cacheKey, planFound, 1800);

    return planFound;
  }

  async findByStripePriceId(stripePriceId: string): Promise<DbPlan> {
    const cacheKey = `plan:stripe:${stripePriceId}`;

    const cached = await this.cacheManager.get<DbPlan>(cacheKey);
    if (cached) {
      return cached;
    }

    const planByStripe = await this.plansRepo.findByStripePriceId(stripePriceId);

    if (!planByStripe) {
      throw new NotFoundException('Plan de Stripe no encontrado');
    }

    await this.cacheManager.set(cacheKey, planByStripe, 1800);

    return planByStripe;
  }
}
