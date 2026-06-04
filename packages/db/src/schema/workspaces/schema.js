"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.document = exports.workspace = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const schema_1 = require("../users/schema");
exports.workspace = (0, pg_core_1.pgTable)('workspace', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    userId: (0, pg_core_1.text)('user_id')
        .notNull()
        .references(() => schema_1.user.id, { onDelete: 'cascade' }),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description'),
    customContext: (0, pg_core_1.text)('custom_context'),
    category: (0, pg_core_1.text)('category'),
    icon: (0, pg_core_1.text)('icon'),
    bgColor: (0, pg_core_1.text)('bg_color'),
    isFavorite: (0, pg_core_1.boolean)('is_favorite').default(false).notNull(),
    isArchived: (0, pg_core_1.boolean)('is_archived').default(false).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.document = (0, pg_core_1.pgTable)('document', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    workspaceId: (0, pg_core_1.text)('workspace_id')
        .notNull()
        .references(() => exports.workspace.id, { onDelete: 'cascade' }),
    name: (0, pg_core_1.text)('name').notNull(),
    type: (0, pg_core_1.text)('type').notNull(),
    url: (0, pg_core_1.text)('url').notNull(),
    key: (0, pg_core_1.text)('key'),
    sizeBytes: (0, pg_core_1.integer)('size_bytes'),
    status: (0, pg_core_1.text)('status').default('pending').notNull(),
    generateFlashcards: (0, pg_core_1.boolean)('generate_flashcards').default(true).notNull(),
    generateQuizzes: (0, pg_core_1.boolean)('generate_quizzes').default(true).notNull(),
    generateSummary: (0, pg_core_1.boolean)('generate_summary').default(true).notNull(),
    aiSummary: (0, pg_core_1.text)('ai_summary'),
    thumbnailUrl: (0, pg_core_1.text)('thumbnail_url'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
