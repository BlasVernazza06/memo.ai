import { relations } from 'drizzle-orm';
import { userActivity, notification } from './schema';
import { user } from '../users/schema';
import { workspace } from '../workspaces/schema';

export const userActivityRelations = relations(userActivity, ({ one }) => ({
  user: one(user, { fields: [userActivity.userId], references: [user.id] }),
  workspace: one(workspace, {
    fields: [userActivity.workspaceId],
    references: [workspace.id],
  }),
}));

export const notificationRelations = relations(notification, ({ one }) => ({
  user: one(user, { fields: [notification.userId], references: [user.id] }),
}));
