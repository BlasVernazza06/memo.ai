import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_CONNECTION } from '@modules/database/database-connection';
import { and, like, lt } from 'drizzle-orm';
// Helper eq para drizzle que no está importado arriba
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import {
  type Database,
  flashcard,
  flashcardDeck,
  quiz,
  quizAttempt,
  quizQuestion,
  streaks,
  user,
  userAchievement,
  workspace,
} from '@repo/db';

@Injectable()
export class UsersDemoService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  /**
   * Semilla datos interactivos premium para un usuario demo recién registrado.
   */
  async seedDemoData(userId: string) {
    console.log(
      `[UsersDemoService] Iniciando semillado premium para usuario demo: ${userId}`,
    );

    // Forzar la verificación del email en base de datos para la cuenta demo
    await this.db
      .update(user)
      .set({ emailVerified: true })
      .where(eq(user.id, userId));

    // 1. Crear Workspace 1: Inteligencia Artificial (Violeta)
    const ws1Id = uuidv4();
    await this.db.insert(workspace).values({
      id: ws1Id,
      userId,
      name: '🤖 Inteligencia Artificial',
      description:
        'Conceptos clave, algoritmos de Machine Learning y Redes Neuronales.',
      icon: 'brain',
      bgColor: '#7C3AED',
      isFavorite: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 2. Crear Workspace 2: Historia del Arte (Ámbar)
    const ws2Id = uuidv4();
    await this.db.insert(workspace).values({
      id: ws2Id,
      userId,
      name: '📚 Historia del Arte',
      description:
        'Repaso general de movimientos artísticos desde el Renacimiento hasta el Arte Moderno.',
      icon: 'palette',
      bgColor: '#F59E0B',
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 3. Crear Mazo de Flashcards para Workspace 1
    const deckId = uuidv4();
    await this.db.insert(flashcardDeck).values({
      id: deckId,
      workspaceId: ws1Id,
      name: 'Conceptos Clave de IA',
      description: 'Flashcards con definiciones fundamentales.',
      color: '#7C3AED',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 4. Crear Flashcards para el mazo
    const flashcardsData = [
      {
        front: '¿Qué es el Aprendizaje Supervisado?',
        back: 'Un tipo de algoritmo de IA que entrena con datos etiquetados (entradas con sus respuestas correctas asociadas).',
      },
      {
        front: '¿Cuál es la diferencia entre IA y Machine Learning?',
        back: 'La IA es el concepto amplio de máquinas capaces de imitar inteligencia humana. El Machine Learning es un subcampo enfocado en aprender de datos de forma autónoma sin programación explícita.',
      },
      {
        front: '¿Qué es una red neuronal artificial?',
        back: 'Un modelo computacional inspirado en la estructura del cerebro humano que procesa información en capas de nodos interconectados.',
      },
      {
        front: '¿Qué papel juega la función de pérdida?',
        back: 'Mide qué tan lejos están las predicciones del modelo respecto a los valores reales, guiando la optimización de los pesos.',
      },
      {
        front: '¿Qué es el sobreajuste (overfitting)?',
        back: 'Cuando un modelo se aprende de memoria los datos de entrenamiento pero falla al generalizar y predecir correctamente sobre datos nuevos.',
      },
    ];

    for (const card of flashcardsData) {
      await this.db.insert(flashcard).values({
        id: uuidv4(),
        deckId,
        front: card.front,
        back: card.back,
        mastery: Math.floor(Math.random() * 3), // Variación de maestría
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // 5. Crear un Quiz en el Workspace 1
    const quizId = uuidv4();
    await this.db.insert(quiz).values({
      id: quizId,
      workspaceId: ws1Id,
      name: 'Introducción a Redes Neuronales',
      description:
        'Quiz interactivo para evaluar los conceptos de capas, funciones de activación y optimizadores.',
      totalQuestions: 3,
      isAiGenerated: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 6. Añadir preguntas al Quiz
    const questions = [
      {
        question:
          '¿Cuál de los siguientes es un algoritmo clásico de Machine Learning?',
        options: [
          'Regresión Lineal',
          'HTML5 Nesting',
          'Docker Compose',
          'CSS Grid Layout',
        ],
        correctAnswer: 0,
        explanation:
          'La regresión lineal es un modelo estadístico y de aprendizaje supervisado básico altamente utilizado.',
      },
      {
        question:
          '¿Qué significa el término "overfitting" en Inteligencia Artificial?',
        options: [
          'Que el modelo es demasiado rápido',
          'Que el modelo memorizó los datos de entrenamiento y falla al predecir datos nuevos',
          'Que el entrenamiento no tiene suficientes capas de neuronas',
          'Que las variables de entrada son redundantes',
        ],
        correctAnswer: 1,
        explanation:
          'El sobreajuste u overfitting ocurre cuando el modelo aprende el ruido de los datos de entrenamiento, perdiendo generalización.',
      },
      {
        question:
          '¿Qué función se utiliza comúnmente para normalizar la salida de una red neuronal multiclasificación en probabilidades?',
        options: ['ReLU', 'Softmax', 'Sigmoide', 'Tangente Hiperbólica'],
        correctAnswer: 1,
        explanation:
          'Softmax escala las salidas en valores entre 0 y 1 que en conjunto suman exactamente 1.0 (probabilidades).',
      },
    ];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      await this.db.insert(quizQuestion).values({
        id: uuidv4(),
        quizId,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        order: i + 1,
        createdAt: new Date(),
      });
    }

    // 7. Crear un intento de Quiz (Quiz Attempt) completado con 3/3 aciertos (100% de efectividad)
    await this.db.insert(quizAttempt).values({
      id: uuidv4(),
      quizId,
      userId,
      score: 3,
      totalQuestions: 3,
      completedAt: new Date(),
    });

    // 8. Crear racha de estudio activa (Streak de 3 días) para detonar las animaciones de celebración
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    await this.db.insert(streaks).values({
      id: uuidv4(),
      userId,
      currentStreak: 3,
      maxStreak: 5,
      lastActivity: new Date(),
      createdAt: threeDaysAgo,
      updatedAt: new Date(),
    });

    // 9. Pre-desbloquear logros en el perfil
    await this.db.insert(userAchievement).values({
      id: uuidv4(),
      userId,
      achievementSlug: 'first_quiz',
      unlockedAt: new Date(),
    });

    await this.db.insert(userAchievement).values({
      id: uuidv4(),
      userId,
      achievementSlug: 'workspace_first',
      unlockedAt: new Date(),
    });

    await this.db.insert(userAchievement).values({
      id: uuidv4(),
      userId,
      achievementSlug: 'streak_3',
      unlockedAt: new Date(),
    });

    console.log(
      `[UsersDemoService] Semillado completado con éxito para: ${userId}`,
    );

    // 10. Limpieza en segundo plano de usuarios demo obsoletos (> 24 horas)
    this.cleanupExpiredDemoUsers().catch((err) => {
      console.error(
        '[UsersDemoService] Error al limpiar usuarios demo caducados:',
        err,
      );
    });
  }

  /**
   * Elimina de forma segura usuarios demo creados hace más de 24 horas.
   * La base de datos realiza borrado en cascada para workspaces, flashcards, quices, etc.
   */
  async cleanupExpiredDemoUsers() {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    console.log(
      '[UsersDemoService] Ejecutando limpieza automática de usuarios demo expirados...',
    );

    const expiredUsers = await this.db
      .select({ id: user.id })
      .from(user)
      .where(and(like(user.email, 'guest-%'), lt(user.createdAt, oneDayAgo)));

    if (expiredUsers.length === 0) {
      console.log(
        '[UsersDemoService] No se encontraron usuarios demo expirados para limpiar.',
      );
      return;
    }

    console.log(
      `[UsersDemoService] Se encontraron ${expiredUsers.length} usuarios demo expirados. Eliminando...`,
    );

    for (const expUser of expiredUsers) {
      try {
        await this.db.delete(user).where(eq(user.id, expUser.id));
        console.log(
          `[UsersDemoService] Usuario demo eliminado correctamente: ${expUser.id}`,
        );
      } catch (err) {
        console.error(
          `[UsersDemoService] Error al borrar usuario ${expUser.id}:`,
          err,
        );
      }
    }
  }
}
