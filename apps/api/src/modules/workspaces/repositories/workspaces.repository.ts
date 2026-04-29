import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { and, eq, inArray, sql } from 'drizzle-orm';
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
        icon: data.emoji || data.icon, // Usar emoji de la IA si existe
        coverImage: data.coverImage,
        isFavorite: data.isFavorite || false,
      }),
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
          key: docData.key,
          thumbnailUrl: docData.thumbnailBase64 ?? null,
          sizeBytes: docData.sizeBytes ?? null,
          status: 'analyzed',
          aiSummary: docData.aiSummary ?? null,
        }),
      );
    }

    // 3. Preparar Mazos y Flashcards (si existen)
    // Soportar tanto el formato antiguo (flashcards plano) como el nuevo (flashcardDecks)
    if (data.flashcardDecks && data.flashcardDecks.length > 0) {
      for (const deck of data.flashcardDecks) {
        const deckId = uuidv4();
        batchRequests.push(
          this.db.insert(flashcardDeck).values({
            id: deckId,
            workspaceId,
            name: deck.name || 'Mazo de estudio',
            description: deck.description || null,
            color: deck.color || null,
          }),
        );

        const cardsToInsert = deck.flashcards.map((f: any) => ({
          id: uuidv4(),
          deckId,
          front: f.front || f.question || '',
          back: f.back || f.answer || '',
          mastery: 0,
          reviewCount: 0,
        }));

        if (cardsToInsert.length > 0) {
          batchRequests.push(this.db.insert(flashcard).values(cardsToInsert));
        }
      }
    } else if (data.flashcards && data.flashcards.length > 0) {
      const deckId = uuidv4();
      batchRequests.push(
        this.db.insert(flashcardDeck).values({
          id: deckId,
          workspaceId,
          name: data.name || 'Mazo de estudio',
        }),
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
            workspace: {
              columns: { id: true, name: true },
            },
          },
        },
        flashcardDecks: {
          with: {
            flashcards: true,
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
    if (
      result &&
      directDocs.length > 0 &&
      (!result.documents || result.documents.length === 0)
    ) {
      console.log(
        '[WorkspacesRepository] ATENCIÓN: Join de Drizzle falló, inyectando directDocs manualmente',
      );
      result.documents = directDocs;
    }

    return result as WorkspaceWithRelations | undefined;
  }

  async like(userId: string, workspaceId: string): Promise<boolean> {
    const rows = await this.db
      .update(workspace)
      .set({
        isFavorite: sql`NOT ${workspace.isFavorite}`,
        updatedAt: new Date(),
      })
      .where(and(eq(workspace.userId, userId), eq(workspace.id, workspaceId)))
      .returning({ id: workspace.id });

    return rows.length > 0;
  }

  async delete(userId: string, workspaceId: string): Promise<boolean> {
    console.log(`[WorkspacesRepository] Iniciando eliminación de Workspace: ${workspaceId} para usuario: ${userId}`);

    // Gracias al 'onDelete: cascade' en el esquema de la base de datos,
    // solo necesitamos borrar el workspace principal. 
    // Los documentos, quizzes, flashcards, chats, etc., se borrarán automáticamente en la BD.
    
    const result = await this.db
      .delete(workspace)
      .where(and(eq(workspace.userId, userId), eq(workspace.id, workspaceId)))
      .returning({ id: workspace.id });

    const deleted = result.length > 0;
    
    if (deleted) {
      console.log(`[WorkspacesRepository] Workspace ${workspaceId} eliminado con éxito de la base de datos.`);
    } else {
      console.warn(`[WorkspacesRepository] No se encontró el workspace ${workspaceId} para eliminar o no pertenece al usuario.`);
    }

    return deleted;
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

  async addFlashcards(
    workspaceId: string,
    cards: any[],
    workspaceName: string,
  ): Promise<void> {
    const deckId = uuidv4();
    const batchRequests: any[] = [];

    batchRequests.push(
      this.db.insert(flashcardDeck).values({
        id: deckId,
        workspaceId,
        name: `Mazo Extra - ${new Date().toLocaleDateString()}`,
      }),
    );

    const cardsToInsert = cards.map((f: any) => ({
      id: uuidv4(),
      deckId,
      front: f.front || f.question || '',
      back: f.back || f.answer || '',
      mastery: 0,
      reviewCount: 0,
    }));

    batchRequests.push(this.db.insert(flashcard).values(cardsToInsert));

    await (this.db as any).batch(batchRequests);
  }

  async addQuizzes(workspaceId: string, quizzes: any[]): Promise<void> {
    const batchRequests: any[] = [];

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
        const questionsToInsert = q.questions.map(
          (ques: any, index: number) => ({
            id: uuidv4(),
            quizId,
            question: ques.question,
            options: ques.options,
            correctAnswer: ques.correctAnswer,
            explanation: ques.explanation || null,
            order: index,
          }),
        );

        batchRequests.push(
          this.db.insert(quizQuestion).values(questionsToInsert),
        );
      }
    }

    await (this.db as any).batch(batchRequests);
  }
}
