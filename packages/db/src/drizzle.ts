import { neon } from '@neondatabase/serverless';
import { type NeonHttpDatabase, drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

export type Database = NeonHttpDatabase<typeof schema>;

const createDb = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return null as any;
  }
  const sql = neon(url);
  return drizzle(sql, { schema }) as Database;
};

export const db = createDb();

export { schema };
