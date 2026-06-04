import { z } from 'zod';
import { DocumentSchema } from './documents';
import { FlashcardSchema, FlashcardDeckSchema } from './flashcards';
import { QuizSchema } from './quizzes';

export const CreateWorkspaceSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().optional(),
  category: z.string().optional(),
  customContext: z.string().optional(),
  icon: z.string().optional(),
  emoji: z.string().optional(),
  bgColor: z.string().nullable().optional(),
  isFavorite: z.boolean().optional(),
  document: DocumentSchema.optional(),
  documents: z.array(DocumentSchema).optional(),
  flashcards: z.array(FlashcardSchema).optional(),
  flashcardDecks: z.array(FlashcardDeckSchema).optional(),
  quizzes: z.array(QuizSchema).optional(),
});

export const UpdateWorkspaceSchema = z.object({
  name: z.string().min(1, 'El nombre no puede estar vacío').optional(),
  description: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  bgColor: z.string().nullable().optional(),
});

export const WorkspaceCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable().optional(),
  icon: z.string().nullable(),
  bgColor: z.string().nullable(),
  isFavorite: z.boolean(),
  createdAt: z.date().or(z.string()),
  flashcardsCount: z.number(),
  quizzesCount: z.number(),
});

export type WorkspaceCardDTO = z.infer<typeof WorkspaceCardSchema>;

export const WorkspaceDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  bgColor: z.string().nullable(),
  isFavorite: z.boolean(),
  customContext: z.string().optional(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  documents: z.array(DocumentSchema),
  quizzes: z.array(z.any()), // Simplified for now as it can be complex
  flashcardDecks: z.array(z.any()),
  flashcardsCount: z.number().optional(),
  quizzesCount: z.number().optional(),
});

export type WorkspaceDetailDTO = z.infer<typeof WorkspaceDetailSchema>;
export type UpdateWorkspaceDTO = z.infer<typeof UpdateWorkspaceSchema>;
export type CreateWorkspaceDTO = z.infer<typeof CreateWorkspaceSchema>;
