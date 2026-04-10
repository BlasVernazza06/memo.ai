import { Inject, Injectable } from '@nestjs/common';

import { eq, inArray } from 'drizzle-orm';
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
    // Si es un chat de creación, limpiamos los anteriores que estén vacíos para evitar basura
    if (type === 'creation') {
      const unusedChats = await this.db.query.chat.findMany({
        where: (c: any, { and, eq }: any) => and(
          eq(c.userId, userId),
          eq(c.type, 'creation')
        ),
        with: {
          messages: true
        }
      });

      const emptyChatIds = unusedChats
        .filter((c: any) => !c.messages || c.messages.length === 0)
        .map((c: any) => c.id);

      if (emptyChatIds.length > 0) {
        console.log(`[ChatsService] Eliminando ${emptyChatIds.length} chats de creación vacíos para user ${userId}`);
        await this.db.delete(chat).where(inArray(chat.id, emptyChatIds));
      }
    }

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
