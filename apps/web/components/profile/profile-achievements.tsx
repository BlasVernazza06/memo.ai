'use client';

import { useMemo, useState } from 'react';

import { ChevronDown, ChevronUp, Lock, Trophy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';
import { ACHIEVEMENTS, type Achievement } from '@repo/validators';

import AchievementCard from './shared/achievement-card';

// Interface for component props
interface ProfileAchievementsProps {
  stats?: {
    quizzes: number;
    flashcards: number;
    documents: number;
    workspaces?: number;
  };
  streak?: {
    currentStreak: number;
    maxStreak: number;
  } | null;
  achievements?:
    | {
        slug: string;
        unlocked: boolean;
        unlockedAt: string | null;
      }[]
    | null;
}

// Helper function to calculate progress metrics
export function getAchievementProgress(
  slug: string,
  stats: ProfileAchievementsProps['stats'],
  streak: ProfileAchievementsProps['streak'],
  target: number = 1,
): { current: number; percentage: number; unlocked: boolean } {
  let current = 0;
  const maxStreak = streak?.maxStreak ?? 0;

  switch (slug) {
    case 'first_quiz':
    case 'quiz_10':
      current = stats?.quizzes ?? 0;
      break;
    case 'first_deck':
      current = (stats?.flashcards ?? 0) > 0 ? 1 : 0;
      break;
    case 'deck_100_cards':
      current = stats?.flashcards ?? 0;
      break;
    case 'streak_3':
    case 'streak_7':
    case 'streak_30':
      current = maxStreak;
      break;
    case 'workspace_first':
    case 'workspace_5':
      current = stats?.workspaces ?? 0;
      break;
    default:
      current = 0;
  }

  const percentage = Math.min(100, Math.round((current / target) * 100));
  const unlocked = current >= target;

  return { current, percentage, unlocked };
}

/**
 * Main ProfileAchievements Component
 */
export function ProfileAchievements({
  stats,
  streak,
  achievements,
}: ProfileAchievementsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mapeamos los logros de la API en un mapa llave-valor indexado por slug para acceso O(1)
  const apiAchievementsMap = useMemo(() => {
    if (!achievements) return null;
    return new Map(achievements.map((a) => [a.slug, a]));
  }, [achievements]);

  // Calculamos cuántos logros están desbloqueados
  const unlockedCount = ACHIEVEMENTS.filter((achievement) => {
    const target = achievement.target ?? 1;

    // Modo Real / Fallback transparente
    const { unlocked: realUnlocked } = getAchievementProgress(
      achievement.slug,
      stats,
      streak,
      target,
    );

    const apiUnlocked =
      apiAchievementsMap?.get(achievement.slug)?.unlocked ?? false;

    return realUnlocked || apiUnlocked;
  }).length;

  // The subset of achievements shown by default (first row of 4)
  const initialAchievements = ACHIEVEMENTS.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-[2.5rem] p-6 shadow-sm space-y-6 relative"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h3 className="text-lg font-black text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500 fill-amber-500/20" />
            Logros
          </h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            {unlockedCount} de {ACHIEVEMENTS.length} desbloqueados
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-lg font-bold text-[10px] uppercase tracking-widest flex gap-2 h-8 px-3 border-border/50 transition-all hover:bg-muted/30"
        >
          {isExpanded ? (
            <>
              Ver Menos <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Ver Todos <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </Button>
      </div>

      {/* Grid container with smooth layout transitions (Solves all Tooltip crop bugs) */}
      <div className="relative">
        <motion.div
          layout="position"
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="overflow-visible pt-12"
        >
          {/* Se renderizan condicionalmente los logros en el DOM. Al ser overflow-visible siempre, los Tooltips nunca se recortarán */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-2">
            {(isExpanded ? ACHIEVEMENTS : initialAchievements).map(
              (achievement) => (
                <AchievementCard
                  key={achievement.slug}
                  achievement={achievement}
                  stats={stats}
                  streak={streak}
                  apiAchievement={
                    apiAchievementsMap?.get(achievement.slug) ?? null
                  }
                />
              ),
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
