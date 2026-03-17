import { z } from 'zod';

import { DbChat, DbMessage } from '@repo/db';

export const chatAttachmentSchema = z.object({
  key: z.string(),
  url: z.string(),
  name: z.string(),
  type: z.string(),
});

export type ChatAttachment = z.infer<typeof chatAttachmentSchema>;

export type ChatWithMessages = DbChat & { messages: DbMessage[] };

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
