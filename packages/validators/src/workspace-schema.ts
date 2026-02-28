import { z } from 'zod';

export const DocumentSchema = z.object({
  name: z.string(),
  type: z.string(),
  url: z.string().url(),
  sizeBytes: z.number().optional(),
  aiSummary: z.string().optional(),
});

export const FlashcardSchema = z.object({
  question: z.string().optional(),
  front: z.string().optional(),
  answer: z.string().optional(),
  back: z.string().optional(),
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
  coverImage: z.string().url().nullable().optional(),
  isFavorite: z.boolean().optional(),
  document: DocumentSchema.optional(),
  documents: z.array(DocumentSchema).optional(),
  flashcards: z.array(FlashcardSchema).optional(),
  quizzes: z.array(QuizSchema).optional(),
});

export const UpdateWorkspaceSchema = CreateWorkspaceSchema.partial();
