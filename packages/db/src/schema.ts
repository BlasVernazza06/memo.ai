import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

// ============================================================
// AUTH TABLES (Better Auth)
// ============================================================

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  plan: text('plan', { enum: ['free', 'pro'] })
    .default('free')
    .notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
});

export type DbUser = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// RELATIONS - AUTH
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  workspaces: many(workspace),
  activities: many(userActivity),
  notifications: many(notification),
  chats: many(chat),
  quizAttempts: many(quizAttempt),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

// ============================================================
// PLANS TABLES
// ============================================================

export const plan = pgTable('plan', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  stripePriceId: text('stripe_price_id'),
  description: text('description'), // Para mostrar información detallada
  popular: boolean('popular').default(false), // Marca el plan recomendado
  features: jsonb('features').notNull(),
  limits: jsonb('limits').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbPlan = InferSelectModel<typeof plan>;
export type NewPlan = InferInsertModel<typeof plan>;

// ============================================================
// WORKSPACE TABLES
// ============================================================

/**
 * workspace - Espacio de estudio principal del usuario.
 * Ahora con soporte para favoritos, portada y contexto manual.
 */
export const workspace = pgTable('workspace', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  name: text('name').notNull(),
  description: text('description'),
  customContext: text('custom_context'), // El "poco de texto" para dar mas contexto a la IA
  category: text('category'), // ej: "Medicina", "Programación"
  icon: text('icon'), // emoji o nombre de icono
  coverImage: text('cover_image'), // URL de Uploadthing para la portada de la card
  isFavorite: boolean('is_favorite').default(false).notNull(),
  isArchived: boolean('is_archived').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbWorkspace = InferSelectModel<typeof workspace>;
export type NewWorkspace = InferInsertModel<typeof workspace>;

/**
 * document - Archivos alojados en Uploadthing.
 * Incluye preferencias de estudio que el usuario seleccionó al subirlo.
 */
export const document = pgTable('document', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id')
    .notNull()
    .references(() => workspace.id),
  name: text('name').notNull(),
  type: text('type').notNull(), // "pdf" | "video" | "image" | "audio" | "text"
  url: text('url').notNull(), // URL de Uploadthing
  sizeBytes: integer('size_bytes'),
  status: text('status').default('pending').notNull(), // "pending" | "processing" | "analyzed" | "error"

  // Preferencias de generación (Modal de opciones al subir)
  generateFlashcards: boolean('generate_flashcards').default(true).notNull(),
  generateQuizzes: boolean('generate_quizzes').default(true).notNull(),
  generateSummary: boolean('generate_summary').default(true).notNull(),

  aiSummary: text('ai_summary'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbDocument = InferSelectModel<typeof document>;
export type NewDocument = InferInsertModel<typeof document>;

/**
 * flashcard_deck - Mazos de flashcards dentro de un workspace.
 */
export const flashcardDeck = pgTable('flashcard_deck', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id')
    .notNull()
    .references(() => workspace.id),
  name: text('name').notNull(),
  description: text('description'),
  color: text('color'), // gradiente o color del mazo
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbFlashcardDeck = InferSelectModel<typeof flashcardDeck>;
export type NewFlashcardDeck = InferInsertModel<typeof flashcardDeck>;

/**
 * flashcard - Cartas individuales dentro de un mazo.
 */
export const flashcard = pgTable('flashcard', {
  id: text('id').primaryKey(),
  deckId: text('deck_id')
    .notNull()
    .references(() => flashcardDeck.id),
  front: text('front').notNull(), // pregunta / frente de la carta
  back: text('back').notNull(), // respuesta / dorso de la carta
  mastery: integer('mastery').default(0).notNull(), // 0-100, dominio del usuario
  nextReview: timestamp('next_review'), // para repetición espaciada
  reviewCount: integer('review_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * quiz - Quizzes generados dentro de un workspace.
 */
export const quiz = pgTable('quiz', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id')
    .notNull()
    .references(() => workspace.id),
  name: text('name').notNull(),
  description: text('description'),
  totalQuestions: integer('total_questions').default(0).notNull(),
  isAiGenerated: boolean('is_ai_generated').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * quiz_question - Preguntas individuales de un quiz.
 * Las opciones se guardan como JSON para flexibilidad.
 */
export const quizQuestion = pgTable('quiz_question', {
  id: text('id').primaryKey(),
  quizId: text('quiz_id')
    .notNull()
    .references(() => quiz.id),
  question: text('question').notNull(),
  options: jsonb('options').notNull(), // ["opción A", "opción B", "opción C", "opción D"]
  correctAnswer: integer('correct_answer').notNull(), // índice de la respuesta correcta
  explanation: text('explanation'), // explicación de la respuesta
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * quiz_attempt - Historial de intentos del usuario en un quiz.
 */
export const quizAttempt = pgTable('quiz_attempt', {
  id: text('id').primaryKey(),
  quizId: text('quiz_id')
    .notNull()
    .references(() => quiz.id),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  score: integer('score').notNull(), // respuestas correctas
  totalQuestions: integer('total_questions').notNull(),
  answers: jsonb('answers'), // { questionId: selectedOption }
  completedAt: timestamp('completed_at').defaultNow().notNull(),
});

// RELATIONS - WORKSPACE
export const workspaceRelations = relations(workspace, ({ one, many }) => ({
  user: one(user, { fields: [workspace.userId], references: [user.id] }),
  documents: many(document),
  flashcardDecks: many(flashcardDeck),
  quizzes: many(quiz),
  chats: many(chat),
  activities: many(userActivity),
}));

export const documentRelations = relations(document, ({ one }) => ({
  workspace: one(workspace, {
    fields: [document.workspaceId],
    references: [workspace.id],
  }),
}));

export const flashcardDeckRelations = relations(
  flashcardDeck,
  ({ one, many }) => ({
    workspace: one(workspace, {
      fields: [flashcardDeck.workspaceId],
      references: [workspace.id],
    }),
    flashcards: many(flashcard),
  }),
);

export const flashcardRelations = relations(flashcard, ({ one }) => ({
  deck: one(flashcardDeck, {
    fields: [flashcard.deckId],
    references: [flashcardDeck.id],
  }),
}));

export const quizRelations = relations(quiz, ({ one, many }) => ({
  workspace: one(workspace, {
    fields: [quiz.workspaceId],
    references: [workspace.id],
  }),
  questions: many(quizQuestion),
  attempts: many(quizAttempt),
}));

export const quizQuestionRelations = relations(quizQuestion, ({ one }) => ({
  quiz: one(quiz, { fields: [quizQuestion.quizId], references: [quiz.id] }),
}));

export const quizAttemptRelations = relations(quizAttempt, ({ one }) => ({
  quiz: one(quiz, { fields: [quizAttempt.quizId], references: [quiz.id] }),
  user: one(user, { fields: [quizAttempt.userId], references: [user.id] }),
}));

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
export const userActivity = pgTable('user_activity', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  workspaceId: text('workspace_id').references(() => workspace.id),
  type: text('type').notNull(),
  metadata: jsonb('metadata'), // datos extra: { workspaceName, count, score, fileName... }
  date: text('date').notNull(), // "2026-02-18" — solo fecha, para cálculo de racha
  createdAt: timestamp('created_at').defaultNow().notNull(),
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
export const notification = pgTable('notification', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  type: text('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  icon: text('icon'), // nombre del icono (ej: "Flame", "Trophy", "CheckCircle2")
  metadata: jsonb('metadata'), // datos extra opcionales
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type DbNotification = InferSelectModel<typeof notification>;
export type NewNotification = InferInsertModel<typeof notification>;

// RELATIONS - ACTIVITY
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

// ============================================================
// CHAT TABLES
// ============================================================

/**
 * chat - Sesiones de chat entre el usuario y la IA.
 * Puede ser para la creación de un workspace o para consultas dentro de uno.
 */
export const chat = pgTable('chat', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  workspaceId: text('workspace_id').references(() => workspace.id),
  title: text('title'),
  type: text('type').default('creation').notNull(), // "creation" | "study"
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DbChat = InferSelectModel<typeof chat>;
export type NewChat = InferInsertModel<typeof chat>;

/**
 * message - Mensajes individuales dentro de un chat.
 */
export const message = pgTable('message', {
  id: text('id').primaryKey(),
  chatId: text('chat_id')
    .notNull()
    .references(() => chat.id),
  role: text('role').notNull(), // "user" | "assistant"
  content: text('content').notNull(),
  attachments: jsonb('attachments'), // [{ name, url, type }]
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type DbMessage = InferSelectModel<typeof message>;
export type NewMessage = InferInsertModel<typeof message>;

// RELATIONS - CHAT
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
  workspaceRelations,
  documentRelations,
  flashcardDeckRelations,
  flashcardRelations,
  quizRelations,
  quizQuestionRelations,
  quizAttemptRelations,
};

export const activitySchema = {
  userActivity,
  notification,
  userActivityRelations,
  notificationRelations,
};

export const chatSchema = {
  chat,
  message,
  chatRelations,
  messageRelations,
};

export const authSchema = {
  user,
  session,
  account,
  verification,
  userRelations,
  sessionRelations,
  accountRelations,
};

export const planSchema = {
  plan,
};
