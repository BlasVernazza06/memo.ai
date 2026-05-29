import { useState } from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type Achievement } from '@repo/validators';
import Link from 'next/link';

import AchievementTooltip from './achievement-tooltip';
import { getAchievementProgress } from '../profile-achievements';
import { useAuth } from '@/lib/auth-provider';

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
  const { user } = useAuth();
  
  const target = achievement.target ?? 1;
  const isFreePlan = user?.plan === 'free';

  const realProg = getAchievementProgress(
    achievement.slug,
    stats,
    streak,
    target,
  );

  // Si el usuario es del plan gratuito, los logros están forzados a estar bloqueados (unlocked: false)
  const unlocked = isFreePlan 
    ? false 
    : (apiAchievement ? apiAchievement.unlocked || realProg.unlocked : realProg.unlocked);

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
          isFreePlan ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
              className="absolute bottom-[115%] left-1/2 z-[200] w-64 p-5 bg-zinc-950 border-2 border-amber-500/30 rounded-3xl shadow-2xl flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black text-white tracking-tight">
                  LOGROS DESACTIVADOS
                </h4>
                <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">
                  Para desbloquear logros y ganar medallas por tu constancia, pásate al plan Pro.
                </p>
              </div>
              <Link href="/pricing" className="w-full">
                <button className="w-full bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-[10px] font-black uppercase tracking-wider py-2 px-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-1.5 border border-white/10 pointer-events-auto">
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  Pasar a Pro
                </button>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-zinc-950" />
            </motion.div>
          ) : (
            <AchievementTooltip
              title={achievement.title}
              description={achievement.description}
              current={current}
              target={target}
              unlocked={unlocked}
              gradient={uiConfig.gradient}
            />
          )
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
