import { relations } from 'drizzle-orm';

import { user } from '../users/schema';
import { streaks } from './schema';

export const StreakeRelations = relations(streaks, ({ one }) => ({
  user: one(user, {
    fields: [streaks.userId],
    references: [user.id],
  }),
}));
