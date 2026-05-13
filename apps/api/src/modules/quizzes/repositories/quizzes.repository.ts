import { Inject, Injectable } from '@nestjs/common';

import { and, eq, ilike, or } from 'drizzle-orm';

import { type Database, quiz, quizQuestion, workspace } from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

@Injectable()
export class QuizzesRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAllByUser(userId: string) {
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

  async findByWorkspace(userId: string, workspaceId: string) {
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

  async findById(userId: string, quizId: string) {
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
}
