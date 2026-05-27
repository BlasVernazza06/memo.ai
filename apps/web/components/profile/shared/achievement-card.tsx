'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type Achievement } from '@repo/validators';

import AchievementTooltip from './achievement-tooltip';
import { getAchievementProgress } from '../profile-achievements';

import {
  FirstQuizBadge,
  Quiz10Badge,
  FirstDeckBadge,
  Deck100CardsBadge,
  Streak3Badge,
  Streak7Badge,
  Streak30Badge,
  WorkspaceFirstBadge,
  Workspace5Badge,
} from '../achievement-badges';

// UI design configurations mapping badges with SVGs
const ACHIEVEMENT_UI_CONFIG: Record<
  string,
  {
    badge: React.ComponentType<{ unlocked: boolean }>;
    gradient: string;
    glow: string;
  }
> = {
  first_quiz: {
    badge: FirstQuizBadge,
    gradient: 'from-amber-400 via-orange-500 to-amber-600',
    glow: 'shadow-amber-500/20',
  },
  quiz_10: {
    badge: Quiz10Badge,
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
    glow: 'shadow-violet-500/20',
  },
  first_deck: {
    badge: FirstDeckBadge,
    gradient: 'from-blue-400 via-indigo-500 to-blue-600',
    glow: 'shadow-blue-500/20',
  },
  deck_100_cards: {
    badge: Deck100CardsBadge,
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    glow: 'shadow-yellow-500/20',
  },
  streak_3: {
    badge: Streak3Badge,
    gradient: 'from-emerald-400 via-teal-500 to-green-600',
    glow: 'shadow-emerald-500/20',
  },
  streak_7: {
    badge: Streak7Badge,
    gradient: 'from-orange-400 via-red-500 to-amber-600',
    glow: 'shadow-orange-500/20',
  },
  streak_30: {
    badge: Streak30Badge,
    gradient: 'from-rose-400 via-red-500 to-pink-600',
    glow: 'shadow-rose-500/20',
  },
  workspace_first: {
    badge: WorkspaceFirstBadge,
    gradient: 'from-cyan-400 via-teal-500 to-blue-600',
    glow: 'shadow-cyan-500/20',
  },
  workspace_5: {
    badge: Workspace5Badge,
    gradient: 'from-indigo-400 via-purple-500 to-blue-600',
    glow: 'shadow-indigo-500/20',
  },
};

interface AchievementCardProps {
  achievement: Achievement;
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
  apiAchievement?: { unlocked: boolean; unlockedAt: string | null } | null;
}

export default function AchievementCard({
  achievement,
  stats,
  streak,
  apiAchievement,
}: AchievementCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const target = achievement.target ?? 1;

  const realProg = getAchievementProgress(
    achievement.slug,
    stats,
    streak,
    target,
  );

  // Es unlocked si la API lo confirma, O si las estadísticas reales calculadas en el cliente ya alcanzan el target
  const unlocked = apiAchievement
    ? apiAchievement.unlocked || realProg.unlocked
    : realProg.unlocked;

  const current = unlocked ? target : realProg.current;
  const percentage = unlocked ? 100 : realProg.percentage;

  const uiConfig = ACHIEVEMENT_UI_CONFIG[achievement.slug] || {
    badge: FirstQuizBadge,
    gradient: 'from-primary to-primary-foreground',
    glow: 'shadow-primary/10',
  };

  const BadgeComponent = uiConfig.badge;

  return (
    <div
      className="relative flex flex-col items-center w-full"
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
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 350, damping: 15 }}
        className={`w-full bg-neutral-900/10 hover:bg-neutral-900/30 border border-neutral-800/40 hover:border-neutral-700/60 rounded-[2.5rem] p-5 flex flex-col items-center gap-4 transition-all duration-300 relative group cursor-pointer ${
          !unlocked ? 'opacity-30 hover:opacity-60 grayscale-[35%]' : ''
        }`}
      >
        {/* Glow behind active badges */}
        {unlocked && (
          <div
            className={`absolute inset-0 bg-linear-to-br ${uiConfig.gradient} opacity-0 group-hover:opacity-[0.04] rounded-[2.5rem] transition-opacity duration-300`}
          />
        )}

        {/* Badge Icon Container - Premium Round Corner Square */}
        <div
          className={`w-18 h-18 rounded-[2rem] p-0.5 shadow-xl ${
            unlocked ? uiConfig.glow : 'shadow-black/10'
          } relative overflow-hidden`}
        >
          {/* Badge SVG Vector render */}
          <div className="w-full h-full rounded-[1.85rem] bg-neutral-950 flex items-center justify-center relative overflow-hidden p-1 select-none">
            <BadgeComponent unlocked={unlocked} />
          </div>

          {!unlocked && (
            <div className="absolute inset-0 rounded-[2rem] bg-neutral-950/60 backdrop-blur-[0.5px] flex items-center justify-center z-20">
              <Lock className="w-4 h-4 text-neutral-400" />
            </div>
          )}
        </div>

        {/* Title & Progress Column */}
        <div className="w-full text-center space-y-1.5 z-10">
          <p className="font-extrabold text-foreground text-xs tracking-tight truncate w-full px-1">
            {achievement.title}
          </p>

          {/* Step-by-Step progress indicator (e.g. 1/10) */}
          <div className="flex flex-col items-center w-full">
            <span className="text-[10px] text-muted-foreground font-bold tracking-tight">
              {current}/{target}
            </span>

            {/* Custom elegant micro-progress bar */}
            <div className="h-2 w-20 bg-neutral-800/80 rounded-full overflow-hidden mt-1.5 relative border border-neutral-750">
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
