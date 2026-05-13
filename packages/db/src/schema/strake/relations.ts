import { relations } from 'drizzle-orm';

import { user } from '../users/schema';
import { strake } from './schema';

export const StreakeRelations = relations(strake, ({ one }) => ({
  user: one(user, {
    fields: [strake.userId],
    references: [user.id],
  }),
}));
