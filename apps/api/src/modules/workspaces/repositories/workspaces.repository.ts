import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, inArray } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import {
  type Database,
  type WorkspaceWithRelations,
  chat,
  document,
  flashcard,
  flashcardDeck,
  message,
  quiz,
  quizAttempt,
  quizQuestion,
  userActivity,
  workspace,
} from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

import type {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
} from '../dto/workspace-update.dto';

@Injectable()
export class WorkspacesRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async create(
    userId: string,
    data: CreateWorkspaceDto,
  ): Promise<{ id: string }> {
    console.log('REPO: Inicia creación atómica (Batch) para:', data.name);
    
    const workspaceId = uuidv4();
    const batchRequests: any[] = [];
    
    // 1. Preparar Workspace
    batchRequests.push(
      this.db.insert(workspace).values({
        id: workspaceId,
        userId,
        name: data.name,
        description: data.description,
        category: data.category,
        customContext: data.customContext || null,
        icon: data.icon,
        coverImage: data.coverImage,
        isFavorite: data.isFavorite || false,
      })
    );

    // 2. Preparar Documento (si existe)
    const docData = data.document ?? data.documents?.[0];
    if (docData) {
      batchRequests.push(
        this.db.insert(document).values({
          id: uuidv4(),
          workspaceId,
          name: docData.name,
          type: docData.type || 'pdf',
          url: docData.url,
          thumbnailUrl: docData.thumbnailBase64 ?? null,
          sizeBytes: docData.sizeBytes ?? null,
          status: 'analyzed',
          aiSummary: docData.aiSummary ?? null,
        })
      );
    }

    // 3. Preparar Mazos y Flashcards (si existen)
    if (data.flashcards && data.flashcards.length > 0) {
      const deckId = uuidv4();
      batchRequests.push(
        this.db.insert(flashcardDeck).values({
          id: deckId,
          workspaceId,
          name: data.name || 'Mazo de estudio',
        })
      );

      const cardsToInsert = data.flashcards.map((f: any) => ({
        id: uuidv4(),
        deckId,
        front: f.front || f.question || '',
        back: f.back || f.answer || '',
        mastery: 0,
        reviewCount: 0,
      }));

      batchRequests.push(this.db.insert(flashcard).values(cardsToInsert));
    }

    // 4. Preparar Quizzes (si existen)
    if (data.quizzes && data.quizzes.length > 0) {
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
          })
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

          batchRequests.push(this.db.insert(quizQuestion).values(questionsToInsert));
        }
      }
    }

    // Ejecutar todo de forma atómica (si el driver lo soporta) o en ráfaga
    // En neon-http, batch() envía todas las sentencias en una sola petición HTTP
    await (this.db as any).batch(batchRequests);

    return { id: workspaceId };
  }

  async findAll(userId: string): Promise<WorkspaceWithRelations[]> {
    return (await this.db.query.workspace.findMany({
      where: eq(workspace.userId, userId),
      with: {
        documents: true,
        quizzes: { with: { questions: true } },
        flashcardDecks: { with: { flashcards: true } },
      },
    })) as WorkspaceWithRelations[];
  }

  async findById(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceWithRelations | undefined> {
    const result = await this.db.query.workspace.findFirst({
      where: and(eq(workspace.id, workspaceId), eq(workspace.userId, userId)),
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

    // Búsqueda directa para confirmar si el join de Drizzle está fallando
    const directDocs = await this.db.query.document.findMany({
      where: eq(document.workspaceId, workspaceId),
    });

    console.log(`[WorkspacesRepository] findById result for ${workspaceId}:`, {
      id: result?.id,
      name: result?.name,
      documentsCountInResult: (result as any)?.documents?.length || 0,
      directDocsCount: directDocs.length,
    });

    // Si directDocs tiene algo y result.documents no, algo raro pasa con el join
    if (result && directDocs.length > 0 && (!result.documents || result.documents.length === 0)) {
       console.log('[WorkspacesRepository] ATENCIÓN: Join de Drizzle falló, inyectando directDocs manualmente');
       result.documents = directDocs;
    }

    return result as WorkspaceWithRelations | undefined;
  }

  async like(userId: string, workspaceId: string): Promise<boolean> {
    const result = await this.db
      .update(workspace)
      .set({
        isFavorite: true,
        updatedAt: new Date(),
      })
      .where(and(eq(workspace.userId, userId), eq(workspace.id, workspaceId)));

    return !!result;
  }

  async delete(userId: string, workspaceId: string): Promise<boolean> {
    console.log('[REPO] Borrando Workspace:', workspaceId);

    const quizzes = await this.db.query.quiz.findMany({
      where: eq(quiz.workspaceId, workspaceId),
      columns: { id: true },
    });
    const quizIds = quizzes.map((q) => q.id);

    const decks = await this.db.query.flashcardDeck.findMany({
      where: eq(flashcardDeck.workspaceId, workspaceId),
      columns: { id: true },
    });
    const deckIds = decks.map((d) => d.id);

    const chats = await this.db.query.chat.findMany({
      where: eq(chat.workspaceId, workspaceId),
      columns: { id: true },
    });
    const chatIds = chats.map((c) => c.id);

    if (quizIds.length > 0) {
      await this.db
        .delete(quizQuestion)
        .where(inArray(quizQuestion.quizId, quizIds));
      await this.db
        .delete(quizAttempt)
        .where(inArray(quizAttempt.quizId, quizIds));
      await this.db.delete(quiz).where(inArray(quiz.id, quizIds));
    }

    if (deckIds.length > 0) {
      await this.db.delete(flashcard).where(inArray(flashcard.deckId, deckIds));
      await this.db
        .delete(flashcardDeck)
        .where(inArray(flashcardDeck.id, deckIds));
    }

    if (chatIds.length > 0) {
      await this.db.delete(message).where(inArray(message.chatId, chatIds));
      await this.db.delete(chat).where(inArray(chat.id, chatIds));
    }

    await this.db
      .delete(userActivity)
      .where(eq(userActivity.workspaceId, workspaceId));
    await this.db.delete(document).where(eq(document.workspaceId, workspaceId));

    const result = await this.db
      .delete(workspace)
      .where(and(eq(workspace.userId, userId), eq(workspace.id, workspaceId)));

    return !!result;
  }

  async update(
    userId: string,
    workspaceId: string,
    data: Partial<UpdateWorkspaceDto>,
  ): Promise<boolean> {
    const result = await this.db
      .update(workspace)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(workspace.userId, userId), eq(workspace.id, workspaceId)));

    return !!result;
  }
}
