import {
  type InferInsertModel,
  type InferSelectModel,
} from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const plan = pgTable('plan', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  stripePriceId: text('stripe_price_id'),
  description: text('description'),
  popular: boolean('popular').default(false),
  features: jsonb('features').notNull(),
  limits: jsonb('limits').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbPlan = InferSelectModel<typeof plan>;
export type NewPlan = InferInsertModel<typeof plan>;
