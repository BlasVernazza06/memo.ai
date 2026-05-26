import { relations } from 'drizzle-orm';
import { user } from '../users/schema';
import { userAchievement } from './schema';

export const userAchievementRelations = relations(userAchievement, ({ one }) => ({
  user: one(user, {
    fields: [userAchievement.userId],
    references: [user.id],
  }),
}));
