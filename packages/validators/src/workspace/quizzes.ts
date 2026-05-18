import { z } from 'zod';

export const QuizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  explanation: z.string().nullable().optional(),
});

export const QuizSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  questions: z.array(QuizQuestionSchema).optional(),
});

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
