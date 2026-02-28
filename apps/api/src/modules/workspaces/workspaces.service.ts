import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { desc, eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import {
  type Database,
  type DbWorkspace,
  document,
  flashcard,
  flashcardDeck,
  quiz,
  quizQuestion,
  user,
  workspace,
} from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

import { CreateWorkspaceDto, UpdateWorkspaceDto } from './dto/workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  /**
   * Crea un workspace completo con sus contenidos iniciales (docs, cards, quizzes).
   * Ideal para cuando la IA termina de procesar el material.
   */
  async createWorkspace(
    userId: string,
    data: CreateWorkspaceDto,
  ): Promise<{ id: string }> {
    // Check user plan and workspace count
    const currentUser = await this.db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!currentUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (currentUser.plan === 'free') {
      const workspaceCount = await this.db.query.workspace.findMany({
        where: eq(workspace.userId, userId),
      });

      if (workspaceCount.length >= 3) {
        throw new ForbiddenException(
          'Límite de workspaces alcanzado. Pásate al plan Pro para crear workspaces ilimitados.',
        );
      }
    }

    const workspaceId = data.id || uuidv4();

    return await this.db.transaction<{ id: string }>(async (tx) => {
      // 1. Insertar el Workspace
      await tx.insert(workspace).values({
        id: workspaceId,
        userId,
        name: data.name,
        description: data.description ?? '',
        category: data.category ?? 'General',
        customContext: data.customContext ?? '',
        icon: data.icon ?? '📚',
        coverImage: data.coverImage ?? null,
        isFavorite: data.isFavorite ?? false,
      });

      // 2. Insertar Documento (Limitado a 1 por workspace por costos de IA)
      const docToInsert = data.document ?? data.documents?.[0] ?? null;

      if (docToInsert) {
        await tx.insert(document).values({
          id: uuidv4(),
          workspaceId,
          name: docToInsert.name,
          type: docToInsert.type,
          url: docToInsert.url,
          sizeBytes: docToInsert.sizeBytes ?? 0,
          status: 'analyzed',
          aiSummary: docToInsert.aiSummary ?? '',
        });
      }

      // 3. Crear Mazo de Flashcards inicial
      if (data.flashcards && data.flashcards.length > 0) {
        const deckId = uuidv4();
        await tx.insert(flashcardDeck).values({
          id: deckId,
          workspaceId,
          name: 'Mazo de Estudio Principial',
          description: 'Generado automáticamente por Memo AI',
          color: 'blue-500',
        });

        for (const card of data.flashcards) {
          await tx.insert(flashcard).values({
            id: uuidv4(),
            deckId,
            front: card.front ?? card.question ?? '',
            back: card.back ?? card.answer ?? '',
            mastery: 0,
          });
        }
      }

      // 4. Crear Quizzes (si los hay)
      if (data.quizzes && data.quizzes.length > 0) {
        for (const q of data.quizzes) {
          const quizId = uuidv4();
          await tx.insert(quiz).values({
            id: quizId,
            workspaceId,
            name: q.name ?? 'Quiz de Repaso',
            description: q.description ?? '',
            totalQuestions: q.questions?.length ?? 0,
            isAiGenerated: true,
          });

          if (q.questions && q.questions.length > 0) {
            for (let i = 0; i < q.questions.length; i++) {
              const question = q.questions[i];
              await tx.insert(quizQuestion).values({
                id: uuidv4(),
                quizId,
                question: question.question,
                options: question.options,
                correctAnswer: question.correctAnswer,
                explanation: question.explanation ?? '',
                order: i,
              });
            }
          }
        }
      }

      return { id: workspaceId };
    });
  }

  async findAll(userId: string): Promise<DbWorkspace[]> {
    return await this.db.query.workspace.findMany({
      where: eq(workspace.userId, userId),
      orderBy: [desc(workspace.createdAt)],
    });
  }

  async findOne(id: string, userId: string): Promise<DbWorkspace> {
    const ws = await this.db.query.workspace.findFirst({
      where: eq(workspace.id, id),
      with: {
        documents: true,
        quizzes: {
          with: {
            questions: true,
          },
        },
        flashcardDecks: {
          with: {
            flashcards: true,
          },
        },
      },
    });

    if (!ws || ws.userId !== userId) {
      throw new NotFoundException('Workspace no encontrado');
    }

    return ws;
  }

  async update(
    id: string,
    userId: string,
    data: UpdateWorkspaceDto,
  ): Promise<{ success: boolean }> {
    // Validar propiedad
    const existing = await this.db.query.workspace.findFirst({
      where: eq(workspace.id, id),
    });

    if (!existing || existing.userId !== userId) {
      throw new NotFoundException('Workspace no encontrado');
    }

    const {
      document: _document,
      documents: _documents,
      flashcards: _flashcards,
      quizzes: _quizzes,
      id: _id,
      ...updateData
    } = data;

    await this.db
      .update(workspace)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(workspace.id, id));

    return { success: true };
  }

  async remove(id: string, userId: string): Promise<{ success: boolean }> {
    // Podríamos hacer borrado lógico seteando isArchived, o físico.
    await this.db
      .update(workspace)
      .set({ isArchived: true })
      .where(eq(workspace.id, id));

    return { success: true };
  }
}
