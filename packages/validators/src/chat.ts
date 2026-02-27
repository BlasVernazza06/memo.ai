import { z } from 'zod';

export const chatRoleSchema = z.enum(['user', 'ai']);
export type ChatRole = z.infer<typeof chatRoleSchema>;

export const localFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  file: z.any(), // Objeto File del navegador
});

export type LocalFile = z.infer<typeof localFileSchema>;

export const chatMessageSchema = z.object({
  id: z.string(),
  role: chatRoleSchema,
  attachments: z.array(localFileSchema).optional(),
  content: z.string(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
