import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { AchievementsService } from '../service/achievements.service';

interface WorkspaceCreatedPayload {
  userId: string;
  workspaceId: string;
  totalCount: number;
}

@Injectable()
export class WorkspaceAchievementListener {
  constructor(private readonly achievementsService: AchievementsService) {}

  @OnEvent('workspace.created')
  async handleWorkspaceCreated(payload: WorkspaceCreatedPayload) {
    const { userId, totalCount } = payload;

    // "Fundador" (1 workspace o más)
    await this.achievementsService.checkAndUnlock(
      userId,
      'workspace_first',
      totalCount >= 1,
    );

    // "Arquitecto del Conocimiento" (5 workspaces o más)
    await this.achievementsService.checkAndUnlock(
      userId,
      'workspace_5',
      totalCount >= 5,
    );
  }
}
