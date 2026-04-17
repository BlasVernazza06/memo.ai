import { Inject, Injectable } from '@nestjs/common';

import { eq } from 'drizzle-orm/sql';

import { type Database, type DbPlan, plan } from '@repo/db';

import { DATABASE_CONNECTION } from '@/modules/database/database-connection';

@Injectable()
export class PlansRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAll(): Promise<DbPlan[]> {
    return await this.db.query.plan.findMany({});
  }

  async findById(id: string): Promise<DbPlan | undefined> {
    return await this.db.query.plan.findFirst({
      where: eq(plan.id, id),
    });
  }

  async findByStripePriceId(
    stripePriceId: string,
  ): Promise<DbPlan | undefined> {
    return await this.db.query.plan.findFirst({
      where: eq(plan.stripePriceId, stripePriceId),
    });
  }
}
