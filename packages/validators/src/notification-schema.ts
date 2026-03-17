import { z } from 'zod';

export const CreateNotificationSchema = z.object({
  title: z.string(),
  message: z.string(),
  type: z.enum(['success', 'error', 'info', 'warning']),
});

export type CreateNotificationDTO = z.infer<typeof CreateNotificationSchema>;
