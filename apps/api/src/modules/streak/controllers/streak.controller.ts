import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { User } from '@/common/decorators/user.decorator';
import { StreakService } from '../services/streak.service';

@Controller('streaks')
@UseGuards(AuthGuard)
export class StreakController {
  constructor(private readonly streakService: StreakService) {}

  @Get()
  async getStreak(@User('id') userId: string) {
    return await this.streakService.getUserStreak(userId);
  }
}
