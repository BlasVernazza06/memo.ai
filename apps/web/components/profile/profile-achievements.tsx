'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  Flame,
  FolderPlus,
  Layers,
  Library,
  Lock,
  Trophy,
  Zap,
} from 'lucide-react';

import { ACHIEVEMENTS, type Achievement } from '@repo/validators';
import { Button } from '@repo/ui/components/ui/button';

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
}

// UI design configurations for achievements based on their slug
const ACHIEVEMENT_UI_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<any>;
    color: string;
    gradient: string;
    glow: string;
  }
> = {
  first_quiz: {
    icon: Award,
    color: 'text-amber-500',
    gradient: 'from-amber-400 via-orange-500 to-amber-600',
    glow: 'shadow-amber-500/10',
  },
  quiz_10: {
    icon: BrainCircuit,
    color: 'text-violet-500',
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
    glow: 'shadow-violet-500/10',
  },
  first_deck: {
    icon: BookOpen,
    color: 'text-blue-500',
    gradient: 'from-blue-400 via-indigo-500 to-blue-600',
    glow: 'shadow-blue-500/10',
  },
  deck_100_cards: {
    icon: Library,
    color: 'text-yellow-500',
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    glow: 'shadow-yellow-500/10',
  },
  streak_3: {
    icon: Flame,
    color: 'text-emerald-500',
    gradient: 'from-emerald-400 via-teal-500 to-green-600',
    glow: 'shadow-emerald-500/10',
  },
  streak_7: {
    icon: Flame,
    color: 'text-orange-500',
    gradient: 'from-orange-400 via-red-500 to-amber-600',
    glow: 'shadow-orange-500/10',
  },
  streak_30: {
    icon: Zap,
    color: 'text-rose-500',
    gradient: 'from-rose-400 via-red-500 to-pink-600',
    glow: 'shadow-rose-500/10',
  },
  workspace_first: {
    icon: FolderPlus,
    color: 'text-cyan-500',
    gradient: 'from-cyan-400 via-teal-500 to-blue-600',
    glow: 'shadow-cyan-500/10',
  },
  workspace_5: {
    icon: Layers,
    color: 'text-indigo-500',
    gradient: 'from-indigo-400 via-purple-500 to-blue-600',
    glow: 'shadow-indigo-500/10',
  },
};

// Helper function to calculate progress metrics
function getAchievementProgress(
  slug: string,
  stats: ProfileAchievementsProps['stats'],
  streak: ProfileAchievementsProps['streak'],
  target: number = 1
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
 * Animated Tooltip Component for Achievements
 */
function AchievementTooltip({
  title,
  description,
  current,
  target,
  unlocked,
  gradient,
}: {
  title: string;
  description: string;
  current: number;
  target: number;
  unlocked: boolean;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
      animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute bottom-[115%] left-1/2 z-50 w-60 p-4 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-2xl pointer-events-none"
    >
      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-xs font-black text-white tracking-tight">{title}</h4>
          <span
            className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-linear-to-r ${gradient} text-white`}
          >
            {unlocked ? 'Desbloqueado' : 'Bloqueado'}
          </span>
        </div>
        <p className="text-[10px] text-neutral-400 font-medium leading-relaxed">
          {description}
        </p>
        <div className="pt-2 border-t border-neutral-800 flex flex-col gap-1">
          <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">
            Objetivo
          </p>
          <p className="text-[10px] text-neutral-300 font-medium">
            Debes completar {target} {target === 1 ? 'vez' : 'veces'}:{' '}
            <span className="font-extrabold text-white">
              {current}/{target}
            </span>
          </p>
        </div>
      </div>
      {/* Tooltip arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-neutral-950/95" />
    </motion.div>
  );
}

/**
 * Individual Achievement Card Component
 */
function AchievementCard({
  achievement,
  stats,
  streak,
}: {
  achievement: Achievement;
  stats: ProfileAchievementsProps['stats'];
  streak: ProfileAchievementsProps['streak'];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const target = achievement.target ?? 1;

  const { current, percentage, unlocked } = getAchievementProgress(
    achievement.slug,
    stats,
    streak,
    target
  );

  const uiConfig = ACHIEVEMENT_UI_CONFIG[achievement.slug] || {
    icon: Award,
    color: 'text-primary',
    gradient: 'from-primary to-primary-foreground',
    glow: 'shadow-primary/10',
  };

  const IconComponent = uiConfig.icon;

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <AchievementTooltip
            title={achievement.title}
            description={achievement.description}
            current={current}
            target={target}
            unlocked={unlocked}
            gradient={uiConfig.gradient}
          />
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`w-full bg-muted/10 hover:bg-muted/20 border border-border/40 hover:border-border/80 rounded-3xl p-4 flex flex-col items-center gap-3 transition-all duration-300 relative group cursor-pointer ${
          !unlocked ? 'opacity-40 hover:opacity-75 grayscale-50' : ''
        }`}
      >
        {/* Glow behind active badges */}
        {unlocked && (
          <div
            className={`absolute inset-0 bg-linear-to-br ${uiConfig.gradient} opacity-0 group-hover:opacity-[0.03] rounded-3xl transition-opacity duration-300`}
          />
        )}

        {/* Badge Icon Container */}
        <div
          className={`w-14 h-14 rounded-2xl bg-linear-to-br ${
            unlocked ? uiConfig.gradient : 'from-neutral-600 to-neutral-800'
          } p-0.5 shadow-lg ${unlocked ? uiConfig.glow : ''} relative`}
        >
          <div className="w-full h-full rounded-[0.9rem] bg-card flex items-center justify-center relative overflow-hidden">
            {unlocked && (
              <div
                className={`absolute inset-0 bg-linear-to-br ${uiConfig.gradient} opacity-[0.08]`}
              />
            )}
            <IconComponent
              className={`w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                unlocked ? uiConfig.color : 'text-neutral-500'
              }`}
            />
          </div>

          {!unlocked && (
            <div className="absolute inset-0 rounded-2xl bg-background/40 backdrop-blur-[0.5px] flex items-center justify-center z-20">
              <Lock className="w-4 h-4 text-neutral-500" />
            </div>
          )}
        </div>

        {/* Title & Progress Column */}
        <div className="w-full text-center space-y-1">
          <p className="font-black text-foreground text-[10px] tracking-tight truncate w-full">
            {achievement.title}
          </p>

          {/* Step-by-Step progress indicator (e.g. 1/10) */}
          <div className="flex flex-col items-center w-full">
            <span className="text-[9px] text-muted-foreground font-bold tracking-tight">
              {current}/{target}
            </span>

            {/* Custom elegant micro-progress bar */}
            <div className="h-1.5 w-16 bg-muted/60 rounded-full overflow-hidden mt-1 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full bg-linear-to-r ${uiConfig.gradient}`}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Main ProfileAchievements Component
 */
export function ProfileAchievements({ stats, streak }: ProfileAchievementsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Compute how many are unlocked
  const unlockedCount = ACHIEVEMENTS.filter((achievement) => {
    const target = achievement.target ?? 1;
    const { unlocked } = getAchievementProgress(achievement.slug, stats, streak, target);
    return unlocked;
  }).length;

  // The subset of achievements shown by default (first row of 4)
  const initialAchievements = ACHIEVEMENTS.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm space-y-6 relative"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h3 className="text-lg font-black text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
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

      {/* Grid container with expandable motion panel */}
      <div className="relative">
        <AnimatePresence initial={false}>
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {initialAchievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.slug}
                    achievement={achievement}
                    stats={stats}
                    streak={streak}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {/* Scrollable container to maintain size limits */}
              <div className="max-h-[380px] overflow-y-auto pr-1 py-1 custom-scrollbar">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {ACHIEVEMENTS.map((achievement) => (
                    <AchievementCard
                      key={achievement.slug}
                      achievement={achievement}
                      stats={stats}
                      streak={streak}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
