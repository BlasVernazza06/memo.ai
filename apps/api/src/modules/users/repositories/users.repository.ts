import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_CONNECTION } from '@modules/database/database-connection';
import { eq } from 'drizzle-orm';

import {
  type Database,
  type DbUser,
  flashcardDeck,
  quiz,
  user,
  workspace,
} from '@repo/db';

@Injectable()
export class UsersRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findById(userId: string): Promise<DbUser | undefined> {
    return await this.db.query.user.findFirst({
      where: eq(user.id, userId),
    });
  }

  async update(
    userId: string,
    data: Partial<Omit<DbUser, 'id' | 'createdAt'>>,
  ): Promise<void> {
    console.log('[REPO DEBUG] Buscando existencia de usuario:', userId);
    const existingUser = await this.db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!existingUser) {
      console.error(
        '[REPO DEBUG] ERROR FATAL: El usuario no existe en la base de datos con el ID pedido:',
        userId,
      );
      return;
    }

    console.log(
      '[REPO DEBUG] Usuario encontrado en DB:',
      JSON.stringify(existingUser, null, 2),
    );
    console.log('[REPO DEBUG] Procediendo a actualizar...');
    console.log('[REPO DEBUG] Nuevos datos:', JSON.stringify(data, null, 2));

    try {
      await this.db.update(user).set(data).where(eq(user.id, userId));
      console.log(
        '[REPO DEBUG] ¡ÉXITO! Operación de DB finalizada correctamente.',
      );
    } catch (error) {
      console.error(
        '[REPO DEBUG] Error físico al ejecutar update en DB:',
        error,
      );
      throw error;
    }
  }

  async deleteUserById(userId: string): Promise<boolean> {
    const result = await this.db.delete(user).where(eq(user.id, userId));

    if (!result) {
      throw new Error('Error al intentar eliminar el usuario');
    }

    return true;
  }

  async countWorkspaces(userId: string): Promise<number> {
    const workspaces = await this.db.query.workspace.findMany({
      where: eq(workspace.userId, userId),
    });
    return workspaces.length;
  }

  async countContent(
    workspaceId: string,
    type: 'flashcards' | 'quizzes',
  ): Promise<number> {
    if (type === 'flashcards') {
      const decks = await this.db.query.flashcardDeck.findMany({
        where: eq(flashcardDeck.workspaceId, workspaceId),
      });
      return decks.length;
    } else {
      const quizzes = await this.db.query.quiz.findMany({
        where: eq(quiz.workspaceId, workspaceId),
      });
      return quizzes.length;
    }
  }
}
