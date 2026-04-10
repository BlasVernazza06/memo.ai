import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '@repo/db';

// This is a one-off debug script to check why document delete fails.
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  const workspaceId = '0a317116-d804-4308-8bdd-fca1ce80c366';

  const docs = await db.query.document.findMany({
    where: eq(schema.document.workspaceId, workspaceId),
  });

  console.log('Documents found for workspace:', docs.length);
  console.log(docs);

  if (docs.length > 0) {
    const delResult = await db
      .delete(schema.document)
      .where(eq(schema.document.workspaceId, workspaceId));
    console.log('Delete status/result for document:', delResult);
  }
}

main().catch(console.error);
