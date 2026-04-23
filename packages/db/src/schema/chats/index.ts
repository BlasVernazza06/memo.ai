export * from './schema';
export * from './relations';

import { DbChat, DbMessage } from './schema';

export type ChatWithMessages = DbChat & {
  messages: DbMessage[];
};
