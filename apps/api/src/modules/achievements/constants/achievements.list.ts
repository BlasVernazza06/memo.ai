export type AchievementCategory = 'study' | 'streak' | 'workspace' | 'account';

export type AchievementSlug =
  | 'first_quiz'
  | 'quiz_10'
  | 'first_deck'
  | 'deck_100_cards'
  | 'streak_3'
  | 'streak_7'
  | 'streak_30'
  | 'workspace_first'
  | 'workspace_5';

export interface Achievement {
  slug: AchievementSlug;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  target?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  // --- CATEGORÍA: ESTUDIO (Quizzes & Flashcards) ---
  {
    slug: 'first_quiz',
    title: 'Primera Victoria',
    description: 'Completa tu primer quiz con éxito.',
    icon: '🏆',
    category: 'study',
  },
  {
    slug: 'quiz_10',
    title: 'Sabio Frecuente',
    description: 'Completa 10 quizzes en total.',
    icon: '🧠',
    category: 'study',
    target: 10,
  },
  {
    slug: 'first_deck',
    title: 'Paso Iniciático',
    description: 'Completa tu primera sesión de flashcards.',
    icon: '🎴',
    category: 'study',
  },
  {
    slug: 'deck_100_cards',
    title: 'Memoria de Elefante',
    description: 'Repasa un total acumulado de 100 cartas de estudio.',
    icon: '🐘',
    category: 'study',
    target: 100,
  },

  // --- CATEGORÍA: RACHAS ---
  {
    slug: 'streak_3',
    title: 'Punto de Partida',
    description: 'Mantén una racha de estudio activa por 3 días seguidos.',
    icon: '🌱',
    category: 'streak',
    target: 3,
  },
  {
    slug: 'streak_7',
    title: 'Hábito de Hierro',
    description: 'Mantén una racha de estudio por 7 días seguidos.',
    icon: '🔥',
    category: 'streak',
    target: 7,
  },
  {
    slug: 'streak_30',
    title: 'Leyenda del Aprendizaje',
    description: 'Mantén una racha de estudio por 30 días seguidos.',
    icon: '⚡',
    category: 'streak',
    target: 30,
  },

  // --- CATEGORÍA: WORKSPACES ---
  {
    slug: 'workspace_first',
    title: 'Fundador',
    description: 'Crea tu primer espacio de trabajo.',
    icon: '📁',
    category: 'workspace',
  },
  {
    slug: 'workspace_5',
    title: 'Arquitecto del Conocimiento',
    description: 'Crea 5 espacios de trabajo independientes.',
    icon: '🏛️',
    category: 'workspace',
    target: 5,
  },
];
