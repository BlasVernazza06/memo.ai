import { Inject, Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';
import { desc, eq } from 'drizzle-orm';

import { type Database, notification } from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

export interface CreateNotificationDto {
  userId: string;
  type: string;
  title: string;
  message: string;
  icon?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class NotificationsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database,
  ) {}

  /**
   * Crea una nueva notificación en la base de datos.
   */
  async create(data: CreateNotificationDto) {
    const notificationId = randomUUID();

    await this.db.insert(notification).values({
      id: notificationId,
      userId: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      icon: data.icon ?? null,
      metadata: data.metadata ?? null,
      read: false,
      createdAt: new Date(),
    });
  }

  /**
   * Obtiene todas las notificaciones de un usuario ordenadas por fecha descendente.
   */
  async findAllByUserId(userId: string) {
    return await this.db.query.notification.findMany({
      where: eq(notification.userId, userId),
      orderBy: desc(notification.createdAt),
    });
  }

  /**
   * Marca una notificación específica como leída.
   */
  async markAsRead(notificationId: string) {
    await this.db
      .update(notification)
      .set({ read: true })
      .where(eq(notification.id, notificationId));
  }
}
