import { Inject, Injectable } from '@nestjs/common';
import { and, eq, ilike, or } from 'drizzle-orm';
import {
  type Database,
  quiz,
  workspace,
} from '@repo/db';
import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

@Injectable()
export class QuizzesRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAllByUser(userId: string) {
    return await this.db.query.quiz.findMany({
      where: (q, { exists }) =>
        exists(
          this.db
            .select()
            .from(workspace)
            .where(
              and(
                eq(workspace.id, q.workspaceId),
                eq(workspace.userId, userId)
              )
            )
        ),
      with: {
        questions: true,
        workspace: {
            columns: {
                name: true,
                id: true,
            }
        }
      },
    });
  }

  async findByWorkspace(userId: string, workspaceId: string) {
    return await this.db.query.quiz.findMany({
      where: or(
        eq(quiz.workspaceId, workspaceId),
        ilike(quiz.workspaceId, `${workspaceId}%`),
      ),
      with: {
        questions: true,
      },
    });
  }

  async findById(userId: string, quizId: string) {
    return await this.db.query.quiz.findFirst({
      where: or(eq(quiz.id, quizId), ilike(quiz.id, `${quizId}%`)),
      with: {
        questions: true,
        workspace: true,
      },
    });
  }
}
