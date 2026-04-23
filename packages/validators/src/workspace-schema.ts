import { z } from 'zod';

export const DocumentSchema = z.object({
  name: z.string(),
  type: z.string(),
  url: z.string().url(),
  key: z.string(),
  sizeBytes: z.number().optional(),
  aiSummary: z.string().optional(),
  thumbnailBase64: z.string().optional(),
});

export const FlashcardSchema = z.object({
  question: z.string().optional(),
  front: z.string().optional(),
  answer: z.string().optional(),
  back: z.string().optional(),
});

export const FlashcardDeckSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
  flashcards: z.array(FlashcardSchema),
});

export const QuizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  explanation: z.string().optional(),
});

export const QuizSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  questions: z.array(QuizQuestionSchema).optional(),
});

export const CreateWorkspaceSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().optional(),
  category: z.string().optional(),
  customContext: z.string().optional(),
  icon: z.string().optional(),
  emoji: z.string().optional(),
  coverImage: z.string().url().nullable().optional(),
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
});
