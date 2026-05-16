import { z } from 'zod';

export const DocumentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  url: z.string().url(),
  key: z.string().optional().nullable(),
  sizeBytes: z.number().optional(),
  aiSummary: z.string().optional(),
  thumbnailBase64: z.string().optional(),
  thumbnailUrl: z.string().optional(),
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
export type DocumentDTO = z.infer<typeof DocumentSchema>;
export type FlashcardDTO = z.infer<typeof FlashcardSchema>;
export type FlashcardDeckDTO = z.infer<typeof FlashcardDeckSchema>;
export type QuizQuestionDTO = z.infer<typeof QuizQuestionSchema>;
export type QuizDTO = z.infer<typeof QuizSchema>;

export const QuizCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  totalQuestions: z.number(),
  workspaceId: z.string(),
  createdAt: z.date().or(z.string()),
  workspace: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type QuizCardDTO = z.infer<typeof QuizCardSchema>;

export const QuizDetailSchema = QuizCardSchema.extend({
  questions: z.array(QuizQuestionSchema),
});

export type QuizDetailDTO = z.infer<typeof QuizDetailSchema>;

export const FlashcardUpdateSchema = z.object({
  front: z.string().optional(),
  back: z.string().optional(),
});

export const FlashcardsUpdateSchema = z.object({
  flashcards: z.array(FlashcardUpdateSchema),
});

export type FlashcardUpdateDTO = z.infer<typeof FlashcardUpdateSchema>;
export type FlashcardsUpdateDTO = z.infer<typeof FlashcardsUpdateSchema>;

export const FlashcardDeckCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  color: z.string().nullable(),
  workspaceId: z.string(),
  createdAt: z.date().or(z.string()),
  cardsCount: z.number(),
  workspace: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
});
export type FlashcardDeckCardDTO = z.infer<typeof FlashcardDeckCardSchema>;
