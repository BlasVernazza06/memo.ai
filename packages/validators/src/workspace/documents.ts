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

export type DocumentDTO = z.infer<typeof DocumentSchema>;
