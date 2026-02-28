import { Inject, Injectable } from '@nestjs/common';

import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { chat, message } from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

@Injectable()
export class ChatsService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async createChat(
    userId: string,
    type: 'creation' | 'study' = 'creation',
    workspaceId?: string,
  ) {
    const chatId = uuidv4();

    await this.db.insert(chat).values({
      id: chatId,
      userId,
      workspaceId,
      type,
      title: 'Nuevo Chat',
    });

    return { id: chatId };
  }

  async addMessage(
    chatId: string,
    role: 'user' | 'ai',
    content: string,
    attachments?: any,
  ) {
    const messageId = uuidv4();

    await this.db.insert(message).values({
      id: messageId,
      chatId,
      role,
      content,
      attachments,
    });

    // Actualizamos el updatedAt del chat
    await this.db
      .update(chat)
      .set({ updatedAt: new Date() })
      .where(eq(chat.id, chatId));

    return { id: messageId };
  }

  async getChatHistory(chatId: string) {
    const messages = await this.db.query.message.findMany({
      where: eq(message.chatId, chatId),
      orderBy: (m: any, { asc }: any) => [asc(m.createdAt)],
    });

    return messages;
  }

  async getUserChats(userId: string) {
    return await this.db.query.chat.findMany({
      where: eq(chat.userId, userId),
      orderBy: (c: any, { desc }: any) => [desc(c.updatedAt)],
    });
  }
}
