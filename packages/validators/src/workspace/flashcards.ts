import { z } from 'zod';

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

export type FlashcardDTO = z.infer<typeof FlashcardSchema>;
export type FlashcardDeckDTO = z.infer<typeof FlashcardDeckSchema>;

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
