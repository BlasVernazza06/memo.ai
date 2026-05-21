import { Inject, Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';
import { and, count, eq, ilike, or } from 'drizzle-orm';

import {
  type Database,
  quiz,
  quizAttempt,
  quizQuestion,
  workspace,
} from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

import { QuizCardDTO, QuizDetailDTO } from '../dto/quiz.dto';

@Injectable()
export class QuizzesRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAllByUser(userId: string): Promise<QuizCardDTO[]> {
    const data = await this.db
      .select({
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        totalQuestions: quiz.totalQuestions,
        workspaceId: quiz.workspaceId,
        createdAt: quiz.createdAt,
        workspace: {
          id: workspace.id,
          name: workspace.name,
        },
      })
      .from(quiz)
      .innerJoin(workspace, eq(quiz.workspaceId, workspace.id))
      .where(eq(workspace.userId, userId));

    return data;
  }

  async findByWorkspace(
    userId: string,
    workspaceId: string,
  ): Promise<QuizCardDTO[]> {
    const data = await this.db
      .select({
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        totalQuestions: quiz.totalQuestions,
        workspaceId: quiz.workspaceId,
        createdAt: quiz.createdAt,
        workspace: {
          id: workspace.id,
          name: workspace.name,
        },
      })
      .from(quiz)
      .innerJoin(workspace, eq(quiz.workspaceId, workspace.id))
      .where(
        and(
          eq(workspace.userId, userId),
          or(
            eq(quiz.workspaceId, workspaceId),
            ilike(quiz.workspaceId, `${workspaceId}%`),
          ),
        ),
      );

    return data;
  }

  async findById(
    userId: string,
    quizId: string,
  ): Promise<QuizDetailDTO | undefined> {
    const [q] = await this.db
      .select({
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        totalQuestions: quiz.totalQuestions,
        workspaceId: quiz.workspaceId,
        createdAt: quiz.createdAt,
        workspace: {
          id: workspace.id,
          name: workspace.name,
          userId: workspace.userId,
        },
      })
      .from(quiz)
      .innerJoin(workspace, eq(quiz.workspaceId, workspace.id))
      .where(
        and(
          eq(workspace.userId, userId),
          or(eq(quiz.id, quizId), ilike(quiz.id, `${quizId}%`)),
        ),
      )
      .limit(1);

    if (!q) return undefined;

    const questions = await this.db
      .select()
      .from(quizQuestion)
      .where(eq(quizQuestion.quizId, q.id));

    return {
      ...q,
      questions,
    };
  }

  async saveQuizAttempt(userId: string, quizId: string, score: number) {
    const quizAttemptId = randomUUID();
    const totalQuestions = await this.quizzesTotalQuestions(quizId);

    await this.db.insert(quizAttempt).values({
      id: quizAttemptId,
      quizId: quizId,
      userId: userId,
      score: score,
      totalQuestions: totalQuestions,
      completedAt: new Date(),
    });
  }

  async quizzesTotalQuestions(quizId: string): Promise<number> {
    const result = await this.db.query.quiz.findFirst({
      columns: { totalQuestions: true }, // Solo traemos la columna del total
      where: eq(quiz.id, quizId),
    });
    return result?.totalQuestions ?? 0;
  }

  async countUserCompletedQuizzes(userId: string): Promise<number> {
    const [result] = await this.db
      .select({ count: count() }) // Genera un SELECT COUNT(*) a nivel de base de datos
      .from(quizAttempt)
      .where(eq(quizAttempt.userId, userId)); // Filtramos por el ID del usuario
    return result?.count ?? 0; // Si no hay intentos, devuelve 0 de forma segura
  }
}
