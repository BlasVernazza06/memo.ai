import { relations } from 'drizzle-orm';
import { chat, message } from './schema';
import { user } from '../users/schema';
import { workspace } from '../workspaces/schema';

export const chatRelations = relations(chat, ({ one, many }) => ({
  user: one(user, { fields: [chat.userId], references: [user.id] }),
  workspace: one(workspace, {
    fields: [chat.workspaceId],
    references: [workspace.id],
  }),
  messages: many(message),
}));

export const messageRelations = relations(message, ({ one }) => ({
  chat: one(chat, { fields: [message.chatId], references: [chat.id] }),
}));
