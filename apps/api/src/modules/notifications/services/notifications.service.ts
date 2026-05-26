import { Injectable } from '@nestjs/common';
import { CreateNotificationDto, NotificationsRepository } from '../repositories/notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(private readonly notificationsRepo: NotificationsRepository) {}

  /**
   * Registra una notificación en el buzón del usuario.
   */
  async createNotification(data: CreateNotificationDto): Promise<void> {
    await this.notificationsRepo.create(data);
  }

  /**
   * Obtiene la bandeja de entrada de notificaciones del usuario.
   */
  async getUserNotifications(userId: string) {
    return await this.notificationsRepo.findAllByUserId(userId);
  }

  /**
   * Marca una notificación como leída.
   */
  async markNotificationAsRead(notificationId: string): Promise<void> {
    await this.notificationsRepo.markAsRead(notificationId);
  }
}
