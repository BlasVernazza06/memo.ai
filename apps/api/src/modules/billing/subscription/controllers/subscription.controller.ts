import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@thallesp/nestjs-better-auth';

import { DbPlan } from '@repo/db';

import { User } from '@/common/decorators/user.decorator';

import { SubscriptionService } from '../services/subscription.service';

@Controller('subscription')
@UseGuards(AuthGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
}
