import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@thallesp/nestjs-better-auth';

import { User } from '@/common/decorators/user.decorator';

import { AchievementsService } from '../service/achievements.service';

@Controller('achievements')
@UseGuards(AuthGuard)
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  async getMyAchievements(@User('id') userId: string) {
    const list = await this.achievementsService.getUserAchievements(userId);
    return {
      success: true,
      data: list,
    };
  }
}
