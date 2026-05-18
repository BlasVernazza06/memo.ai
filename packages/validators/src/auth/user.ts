import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  image: z.string().nullable().optional(),
  plan: z.enum(['free', 'pro']),
  stripeCustomerId: z.string().nullable().optional(),
  stripeSubscriptionId: z.string().nullable().optional(),
  stripeSubscriptionStatus: z.string().nullable().optional(),
  stripePriceId: z.string().nullable().optional(),
  createdAt: z.date().or(z.string()).optional(),
  updatedAt: z.date().or(z.string()).optional(),
});

export type UserDTO = z.infer<typeof UserSchema>;

export const StreakSchema = z.object({
  id: z.string(),
  userId: z.string(),
  currentStreak: z.number(),
  maxStreak: z.number(),
  lastActivityDate: z.date().or(z.string()).nullable(),
  streakDates: z.array(z.string()),
});

export type StreakDTO = z.infer<typeof StreakSchema>;
