import { pgTable, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

// ============================================================
// AUTH TABLES (Better Auth)
// ============================================================

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export type DbUser = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(() => user.id)
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => user.id),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});

export const authSchema = {
	user,
	session,
	account,
	verification
};

// ============================================================
// WORKSPACE TABLES
// ============================================================

/**
 * workspace - Espacio de estudio principal del usuario.
 * Ahora con soporte para favoritos, portada y contexto manual.
 */
export const workspace = pgTable("workspace", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id),
	name: text("name").notNull(),
	description: text("description"),
	customContext: text("custom_context"), // El "poco de texto" para dar mas contexto a la IA
	category: text("category"),            // ej: "Medicina", "Programación"
	icon: text("icon"),                     // emoji o nombre de icono
	coverImage: text("cover_image"),        // URL de Uploadthing para la portada de la card
	isFavorite: boolean("is_favorite").default(false).notNull(),
	isArchived: boolean("is_archived").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type DbWorkspace = InferSelectModel<typeof workspace>;
export type NewWorkspace = InferInsertModel<typeof workspace>;

/**
 * document - Archivos alojados en Uploadthing.
 * Incluye preferencias de estudio que el usuario seleccionó al subirlo.
 */
export const document = pgTable("document", {
	id: text("id").primaryKey(),
	workspaceId: text("workspace_id").notNull().references(() => workspace.id),
	name: text("name").notNull(),
	type: text("type").notNull(),           // "pdf" | "video" | "image" | "audio" | "text"
	url: text("url").notNull(),             // URL de Uploadthing
	sizeBytes: integer("size_bytes"),
	status: text("status").default("pending").notNull(), // "pending" | "processing" | "analyzed" | "error"
	
	// Preferencias de generación (Modal de opciones al subir)
	generateFlashcards: boolean("generate_flashcards").default(true).notNull(),
	generateQuizzes: boolean("generate_quizzes").default(true).notNull(),
	generateSummary: boolean("generate_summary").default(true).notNull(),
	
	aiSummary: text("ai_summary"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type DbDocument = InferSelectModel<typeof document>;
export type NewDocument = InferInsertModel<typeof document>;

/**
 * flashcard_deck - Mazos de flashcards dentro de un workspace.
 */
export const flashcardDeck = pgTable("flashcard_deck", {
	id: text("id").primaryKey(),
	workspaceId: text("workspace_id").notNull().references(() => workspace.id),
	name: text("name").notNull(),
	description: text("description"),
	color: text("color"),                   // gradiente o color del mazo
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * flashcard - Cartas individuales dentro de un mazo.
 */
export const flashcard = pgTable("flashcard", {
	id: text("id").primaryKey(),
	deckId: text("deck_id").notNull().references(() => flashcardDeck.id),
	front: text("front").notNull(),         // pregunta / frente de la carta
	back: text("back").notNull(),           // respuesta / dorso de la carta
	mastery: integer("mastery").default(0).notNull(), // 0-100, dominio del usuario
	nextReview: timestamp("next_review"),   // para repetición espaciada
	reviewCount: integer("review_count").default(0).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * quiz - Quizzes generados dentro de un workspace.
 */
export const quiz = pgTable("quiz", {
	id: text("id").primaryKey(),
	workspaceId: text("workspace_id").notNull().references(() => workspace.id),
	name: text("name").notNull(),
	description: text("description"),
	totalQuestions: integer("total_questions").default(0).notNull(),
	isAiGenerated: boolean("is_ai_generated").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * quiz_question - Preguntas individuales de un quiz.
 * Las opciones se guardan como JSON para flexibilidad.
 */
export const quizQuestion = pgTable("quiz_question", {
	id: text("id").primaryKey(),
	quizId: text("quiz_id").notNull().references(() => quiz.id),
	question: text("question").notNull(),
	options: jsonb("options").notNull(),     // ["opción A", "opción B", "opción C", "opción D"]
	correctAnswer: integer("correct_answer").notNull(), // índice de la respuesta correcta
	explanation: text("explanation"),        // explicación de la respuesta
	order: integer("order").default(0).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * quiz_attempt - Historial de intentos del usuario en un quiz.
 */
export const quizAttempt = pgTable("quiz_attempt", {
	id: text("id").primaryKey(),
	quizId: text("quiz_id").notNull().references(() => quiz.id),
	userId: text("user_id").notNull().references(() => user.id),
	score: integer("score").notNull(),          // respuestas correctas
	totalQuestions: integer("total_questions").notNull(),
	answers: jsonb("answers"),                  // { questionId: selectedOption }
	completedAt: timestamp("completed_at").defaultNow().notNull(),
});

// ============================================================
// ACTIVITY & NOTIFICATIONS TABLES
// ============================================================

/**
 * user_activity - Registra cada acción relevante del usuario.
 * Se usa para: cálculo de racha, feed de actividad reciente y triggers de notificaciones.
 * 
 * Tipos de actividad:
 * - "study"              → Estudió un workspace
 * - "flashcard_created"  → Creó flashcards
 * - "flashcard_reviewed" → Repasó flashcards
 * - "quiz_completed"     → Completó un quiz
 * - "document_uploaded"  → Subió un documento
 * - "workspace_created"  → Creó un workspace
 */
export const userActivity = pgTable("user_activity", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id),
	workspaceId: text("workspace_id").references(() => workspace.id),
	type: text("type").notNull(),
	metadata: jsonb("metadata"),              // datos extra: { workspaceName, count, score, fileName... }
	date: text("date").notNull(),             // "2026-02-18" — solo fecha, para cálculo de racha
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type DbUserActivity = InferSelectModel<typeof userActivity>;
export type NewUserActivity = InferInsertModel<typeof userActivity>;

/**
 * notification - Notificaciones del usuario.
 * Generadas automáticamente por eventos de actividad o por el sistema.
 * 
 * Tipos:
 * - "streak_milestone"     → "🔥 ¡12 días seguidos!"
 * - "achievement_unlocked" → "🏆 Desbloqueaste: Cerebro de Oro"
 * - "quiz_result"          → "✅ Quiz completado: 85%"
 * - "weekly_summary"       → "📊 Tu resumen semanal"
 * - "system"               → Anuncios generales
 */
export const notification = pgTable("notification", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id),
	type: text("type").notNull(),
	title: text("title").notNull(),
	message: text("message").notNull(),
	icon: text("icon"),                       // nombre del icono (ej: "Flame", "Trophy", "CheckCircle2")
	metadata: jsonb("metadata"),              // datos extra opcionales
	read: boolean("read").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type DbNotification = InferSelectModel<typeof notification>;
export type NewNotification = InferInsertModel<typeof notification>;

// ============================================================
// EXPORTS
// ============================================================

export const workspaceSchema = {
	workspace,
	document,
	flashcardDeck,
	flashcard,
	quiz,
	quizQuestion,
	quizAttempt,
};

export const activitySchema = {
	userActivity,
	notification,
};
