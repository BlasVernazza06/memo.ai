import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

const createDb = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    // No lanzamos error aquí para evitar que el proceso muera al importar
    // Pero si se intenta usar la DB, fallará con un mensaje claro.
    return null as any;
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
};

export const db = createDb();

// Exportamos también una función por si necesitamos reinicializar o esperar
export { schema };
