import { Controller, Get, Header, Param, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

import { PlansService } from '@modules/billing/plans/services/plans.service';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

import { DbPlan } from '@repo/db';

@AllowAnonymous()
@Controller('plans')
@UseGuards(ThrottlerGuard)
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  async findAll(): Promise<DbPlan[]> {
    return await this.plansService.findAll();
  }

  @Get(':id')
  @Header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  async findById(@Param('id') id: string): Promise<DbPlan> {
    return await this.plansService.findById(id);
  }
}
