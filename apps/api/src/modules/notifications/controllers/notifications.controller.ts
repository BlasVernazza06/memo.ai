import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

import { User } from '@/common/decorators/user.decorator';
import { NotificationsService } from '../services/notifications.service';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  /**
   * Endpoint: GET /notifications
   * Retorna la lista de notificaciones del usuario (campanita de alertas)
   */
  @Get()
  async getMyNotifications(@User('id') userId: string) {
    const list = await this.notificationsService.getUserNotifications(userId);
    return {
      success: true,
      data: list,
    };
  }

  /**
   * Endpoint: PATCH /notifications/:id/read
   * Marca una notificación específica como leída
   */
  @Patch(':id/read')
  async markAsRead(@Param('id') notificationId: string) {
    await this.notificationsService.markNotificationAsRead(notificationId);
    return {
      success: true,
      message: 'Notificación marcada como leída',
    };
  }
}
