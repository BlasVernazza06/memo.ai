import { Inject, Injectable } from '@nestjs/common';

import type {
  CreateWorkspaceDTO,
  UpdateWorkspaceDTO,
  WorkspaceCardDTO,
} from '@modules/workspaces/dto/workspace.dto';
import { and, count, countDistinct, eq, ilike, or, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import {
  type Database,
  NewFlashcard,
  QuizWithQuestions,
  type WorkspaceWithRelations,
  chat,
  document,
  flashcard,
  flashcardDeck,
  quiz,
  quizQuestion,
  workspace,
} from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

import { FlashcardUpdateDTO } from '../dto/workspace.dto';

@Injectable()
export class WorkspacesRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async create(
    userId: string,
    data: CreateWorkspaceDTO,
  ): Promise<{ id: string }> {
    const workspaceId = uuidv4();
    const batchRequests: unknown[] = [];

    console.log(
      `[WorkspacesRepository] Creando workspace ${workspaceId} para usuario ${userId}`,
    );

    // 1. Crear el Workspace PRIMERO (Operación independiente para asegurar FKs)
    await this.db.insert(workspace).values({
      id: workspaceId,
      userId,
      name: data.name,
      description: data.description,
      category: data.category,
      customContext: data.customContext || null,
      icon: data.emoji || data.icon || '📚',
      bgColor: data.bgColor || '#7C3AED',
      isFavorite: data.isFavorite || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 2. Preparar Documento (si existe)
    const docData = data.document ?? data.documents?.[0];
    if (docData) {
      console.log('[WorkspacesRepository] Insertando documento:', {
        name: docData.name,
        hasThumbUrl: !!docData.thumbnailUrl,
        hasThumbBase64: !!docData.thumbnailBase64,
        finalThumb: docData.thumbnailUrl ?? docData.thumbnailBase64 ?? 'NULL',
      });
      batchRequests.push(
        this.db.insert(document).values({
          id: uuidv4(),
          workspaceId,
          name: docData.name,
          type: docData.type || 'pdf',
          url: docData.url,
          key: docData.key,
          thumbnailUrl: docData.thumbnailUrl ?? docData.thumbnailBase64 ?? null,
          sizeBytes: docData.sizeBytes ?? null,
          status: 'analyzed',
          aiSummary: docData.aiSummary ?? null,
        }),
      );
    }

    // 3. Preparar Mazos y Flashcards
    // Procesar flashcardDecks (formato preferido de la IA)
    if (data.flashcardDecks && data.flashcardDecks.length > 0) {
      console.log(
        `[WorkspacesRepository] Procesando ${data.flashcardDecks.length} mazos`,
      );
      for (const deck of data.flashcardDecks) {
        const deckId = uuidv4();
        batchRequests.push(
          this.db.insert(flashcardDeck).values({
            id: deckId,
            workspaceId,
            name: deck.name || 'Mazo de estudio',
            description: deck.description || null,
            color: deck.color || null,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        );

        const cardsToInsert: NewFlashcard[] = deck.flashcards.map((f) => ({
          id: uuidv4(),
          deckId,
          front: f.front || f.question || '',
          back: f.back || f.answer || '',
          mastery: 0,
          reviewCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        if (cardsToInsert.length > 0) {
          batchRequests.push(this.db.insert(flashcard).values(cardsToInsert));
        }
      }
    }

    // Fallback: Procesar flashcards sueltas si existen y no hay mazos
    if (
      data.flashcards &&
      data.flashcards.length > 0 &&
      (!data.flashcardDecks || data.flashcardDecks.length === 0)
    ) {
      console.log(
        `[WorkspacesRepository] Procesando ${data.flashcards.length} flashcards sueltas`,
      );
      const deckId = uuidv4();
      batchRequests.push(
        this.db.insert(flashcardDeck).values({
          id: deckId,
          workspaceId,
          name: data.name || 'Mazo de estudio',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );

      const cardsToInsert: NewFlashcard[] = data.flashcards.map((f) => ({
        id: uuidv4(),
        deckId,
        front: f.front || f.question || '',
        back: f.back || f.answer || '',
        mastery: 0,
        reviewCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      batchRequests.push(this.db.insert(flashcard).values(cardsToInsert));
    }

    // 4. Preparar Quizzes (si existen)
    if (data.quizzes && data.quizzes.length > 0) {
      console.log(
        `[WorkspacesRepository] Procesando ${data.quizzes.length} quizzes`,
      );
      for (const q of data.quizzes) {
        const quizId = uuidv4();
        batchRequests.push(
          this.db.insert(quiz).values({
            id: quizId,
            workspaceId,
            name: q.name || 'Cuestionario',
            description: q.description || '',
            totalQuestions: q.questions?.length || 0,
            isAiGenerated: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        );

        if (q.questions && q.questions.length > 0) {
          const questionsToInsert = q.questions.map((ques, index) => ({
            id: uuidv4(),
            quizId,
            question: ques.question,
            options: ques.options,
            correctAnswer: ques.correctAnswer,
            explanation: ques.explanation || null,
            order: index,
          }));

          batchRequests.push(
            this.db.insert(quizQuestion).values(questionsToInsert),
          );
        }
      }
    }

    // Ejecutar todo de forma atómica (si el driver lo soporta) o en ráfaga
    // En neon-http, batch() envía todas las sentencias en una sola petición HTTP
    if (batchRequests.length > 0) {
      console.log(
        `[WorkspacesRepository] Ejecutando lote de ${batchRequests.length} operaciones para workspace ${workspaceId}`,
      );
      await this.db.batch(batchRequests as [any, ...any[]]);
    }

    return { id: workspaceId };
  }

  async findAllForCards(userId: string): Promise<WorkspaceCardDTO[]> {
    const data = await this.db
      .select({
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        category: workspace.category,
        createdAt: workspace.createdAt,
        icon: workspace.icon,
        bgColor: workspace.bgColor,
        isFavorite: workspace.isFavorite,
        quizzesCount: countDistinct(quiz.id),
        flashcardsCount: countDistinct(flashcardDeck.id),
      })
      .from(workspace)
      .leftJoin(quiz, eq(workspace.id, quiz.workspaceId))
      .leftJoin(flashcardDeck, eq(workspace.id, flashcardDeck.workspaceId))
      .where(eq(workspace.userId, userId))
      .groupBy(workspace.id);

    return data.map((item) => ({
      ...item,
      flashcardsCount: Number(item.flashcardsCount),
      quizzesCount: Number(item.quizzesCount),
    }));
  }

  async findById(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceWithRelations | undefined> {
    const result = await this.db.query.workspace.findFirst({
      where: and(
        or(
          eq(workspace.id, workspaceId),
          ilike(workspace.id, `${workspaceId}%`),
        ),
        eq(workspace.userId, userId),
      ),
      with: {
        documents: true,
        quizzes: {
          with: {
            questions: true,
            workspace: {
              columns: { id: true, name: true },
            },
          },
        },
        flashcardDecks: {
          with: {
            flashcards: {
              columns: { id: true },
            },
            workspace: {
              columns: { id: true, name: true },
            },
          },
        },
        chats: {
          where: eq(chat.type, 'creation'),
          with: {
            messages: true,
          },
        },
      },
    });

    if (!result) return undefined;

    // Map flashcardDecks to include cardsCount for the frontend cards
    const mappedFlashcardDecks = result.flashcardDecks.map((deck) => ({
      ...deck,
      cardsCount: deck.flashcards?.length || 0,
    }));

    // Búsqueda directa para confirmar si el join de Drizzle está fallando
    const directDocs = await this.db.query.document.findMany({
      where: eq(document.workspaceId, workspaceId),
    });

    // Si directDocs tiene algo y result.documents no, algo raro pasa con el join
    if (
      result &&
      directDocs.length > 0 &&
      (!result.documents || result.documents.length === 0)
    ) {
      result.documents = directDocs;
    }

    return {
      ...result,
      flashcardDecks: mappedFlashcardDecks,
    } as unknown as WorkspaceWithRelations;
  }

  async like(userId: string, workspaceId: string): Promise<boolean> {
    const rows = await this.db
      .update(workspace)
      .set({
        isFavorite: sql`NOT ${workspace.isFavorite}`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(workspace.userId, userId),
          or(
            eq(workspace.id, workspaceId),
            ilike(workspace.id, `${workspaceId}%`),
          ),
        ),
      )
      .returning({ id: workspace.id });

    return rows.length > 0;
  }

  async delete(userId: string, workspaceId: string): Promise<boolean> {
    const result = await this.db
      .delete(workspace)
      .where(
        and(
          eq(workspace.userId, userId),
          or(
            eq(workspace.id, workspaceId),
            ilike(workspace.id, `${workspaceId}%`),
          ),
        ),
      )
      .returning({ id: workspace.id });

    const deleted = result.length > 0;

    if (deleted) {
      console.log(
        `[WorkspacesRepository] Workspace ${workspaceId} eliminado con éxito de la base de datos.`,
      );
    } else {
      console.warn(
        `[WorkspacesRepository] No se encontró el workspace ${workspaceId} para eliminar o no pertenece al usuario.`,
      );
    }

    return deleted;
  }

  async update(
    userId: string,
    workspaceId: string,
    data: Partial<UpdateWorkspaceDTO>,
  ): Promise<boolean> {
    const result = await this.db
      .update(workspace)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(workspace.userId, userId),
          or(
            eq(workspace.id, workspaceId),
            ilike(workspace.id, `${workspaceId}%`),
          ),
        ),
      );

    return !!result;
  }

  async addFlashcards(
    workspaceId: string,
    cards: FlashcardUpdateDTO[],
    deckName?: string,
  ): Promise<void> {
    const deckId = uuidv4();
    const batchRequests: unknown[] = [];

    batchRequests.push(
      this.db.insert(flashcardDeck).values({
        id: deckId,
        workspaceId,
        name: deckName || `Mazo Extra - ${new Date().toLocaleDateString()}`,
      }),
    );

    const cardsToInsert: NewFlashcard[] = cards.map(
      (f: FlashcardUpdateDTO) => ({
        id: uuidv4(),
        deckId,
        front: f.front || f.question || '',
        back: f.back || f.answer || '',
        mastery: 0,
        reviewCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    batchRequests.push(this.db.insert(flashcard).values(cardsToInsert));

    if (batchRequests.length > 0) {
      await this.db.batch(batchRequests as [any, ...any[]]);
    }
  }

  async addQuizzes(
    workspaceId: string,
    quizzes: QuizWithQuestions[],
  ): Promise<void> {
    const batchRequests: unknown[] = [];

    for (const q of quizzes) {
      const quizId = uuidv4();
      batchRequests.push(
        this.db.insert(quiz).values({
          id: quizId,
          workspaceId,
          name: q.name || 'Cuestionario Extra',
          description: q.description || '',
          totalQuestions: q.questions?.length || 0,
          isAiGenerated: true,
        }),
      );

      if (q.questions && q.questions.length > 0) {
        const questionsToInsert = q.questions.map((ques, index) => ({
          id: uuidv4(),
          quizId,
          question: ques.question,
          options: ques.options,
          correctAnswer: ques.correctAnswer,
          explanation: ques.explanation || null,
          order: index,
        }));

        batchRequests.push(
          this.db.insert(quizQuestion).values(questionsToInsert),
        );
      }
    }

    if (batchRequests.length > 0) {
      await this.db.batch(batchRequests as [any, ...any[]]);
    }
  }

  async getSummary(userId: string) {
    const [result] = await this.db
      .select({
        workspaces: countDistinct(workspace.id),
        docs: countDistinct(document.id),
        flashcards: countDistinct(flashcardDeck.id),
      })
      .from(workspace)
      .leftJoin(document, eq(workspace.id, document.workspaceId))
      .leftJoin(flashcardDeck, eq(workspace.id, flashcardDeck.workspaceId))
      .where(eq(workspace.userId, userId));

    return result || { workspaces: 0, docs: 0, flashcards: 0 };
  }
}
