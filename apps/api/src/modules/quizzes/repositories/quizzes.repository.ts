import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
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
      where: eq(quiz.workspaceId, workspaceId),
      with: {
        questions: true,
      },
    });
  }

  async findById(userId: string, quizId: string) {
    return await this.db.query.quiz.findFirst({
      where: eq(quiz.id, quizId),
      with: {
        questions: true,
        workspace: true,
      },
    });
  }
}
