'use client';

import { useMemo, useState } from 'react';

import { ChevronDown, ChevronUp, Lock, Trophy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';
import { ACHIEVEMENTS, type Achievement } from '@repo/validators';

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
function getAchievementProgress(
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

// ============================================================================
// PREMIUM VECTOR BADGES (Duolingo Style - 3D Flat SVGs Inline)
// ============================================================================

function FirstQuizBadge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="50%" stopColor="#F5B041" />
          <stop offset="100%" stopColor="#DC7633" />
        </linearGradient>
        <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EC7063" />
          <stop offset="100%" stopColor="#B03A2E" />
        </linearGradient>
      </defs>
      {/* Ribbons */}
      <path
        d="M35,50 L35,85 L50,75 L65,85 L65,50 Z"
        fill="url(#ribbonGrad)"
        filter="drop-shadow(0px 3px 2px rgba(0,0,0,0.15))"
      />
      <path d="M45,50 L45,88 L50,83 L55,88 L55,50 Z" fill="#E74C3C" />

      {/* Outer Gold Ring */}
      <circle
        cx="50"
        cy="45"
        r="32"
        fill="url(#goldGrad)"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.2))"
      />
      <circle cx="50" cy="45" r="26" fill="#F39C12" />
      <circle cx="50" cy="45" r="22" fill="url(#goldGrad)" />

      {/* Star Detail */}
      <path
        d="M50,30 L54,39 L64,40 L56,47 L59,57 L50,51 L41,57 L44,47 L36,40 L46,39 Z"
        fill="#FFF"
        opacity={unlocked ? 0.9 : 0.4}
      />

      {/* Gloss Sparkles */}
      {unlocked && (
        <>
          <circle cx="32" cy="28" r="3" fill="#FFF" opacity="0.8" />
          <circle cx="68" cy="60" r="2" fill="#FFF" opacity="0.8" />
        </>
      )}
    </svg>
  );
}

function Quiz10Badge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D2B4DE" />
          <stop offset="50%" stopColor="#AF7AC5" />
          <stop offset="100%" stopColor="#76448A" />
        </linearGradient>
        <linearGradient id="brainGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EBDEF0" />
          <stop offset="100%" stopColor="#AF7AC5" />
        </linearGradient>
      </defs>
      {/* Tech Hexagon Background */}
      <polygon
        points="50,12 85,32 85,72 50,92 15,72 15,32"
        fill="url(#purpleGrad)"
        filter="drop-shadow(0px 4px 5px rgba(0,0,0,0.2))"
      />
      <polygon points="50,17 80,34 80,69 50,86 20,69 20,34" fill="#5B2C6F" />

      {/* Brain Robot Silhouette */}
      <rect
        x="36"
        y="44"
        width="28"
        height="26"
        rx="6"
        fill="url(#brainGlow)"
      />
      {/* Left and Right Brain lobes */}
      <circle cx="40" cy="40" r="14" fill="url(#brainGlow)" />
      <circle cx="60" cy="40" r="14" fill="url(#brainGlow)" />
      <circle cx="43" cy="48" r="11" fill="#EBDEF0" />
      <circle cx="57" cy="48" r="11" fill="#EBDEF0" />

      {/* Eyes */}
      <circle cx="42" cy="54" r="3" fill="#8E44AD" />
      <circle cx="58" cy="54" r="3" fill="#8E44AD" />
      {unlocked && (
        <>
          <circle cx="43" cy="53" r="1" fill="#FFF" />
          <circle cx="59" cy="53" r="1" fill="#FFF" />
        </>
      )}

      {/* Sparkles */}
      {unlocked && (
        <path
          d="M50,22 L52,28 L58,30 L52,32 L50,38 L48,32 L42,30 L48,28 Z"
          fill="#FFF"
          opacity="0.9"
        />
      )}
    </svg>
  );
}

function FirstDeckBadge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AED6F1" />
          <stop offset="50%" stopColor="#5DADE2" />
          <stop offset="100%" stopColor="#2E86C1" />
        </linearGradient>
      </defs>
      {/* Rounded Badge Base */}
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        rx="22"
        fill="url(#blueGrad)"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.2))"
      />
      <rect x="20" y="20" width="60" height="60" rx="17" fill="#1B4F72" />

      {/* Book / Flashcard Silhouette */}
      <rect
        x="30"
        y="32"
        width="40"
        height="42"
        rx="4"
        fill="#FFF"
        transform="rotate(-8 50 50)"
      />
      <rect
        x="34"
        y="28"
        width="40"
        height="42"
        rx="4"
        fill="url(#blueGrad)"
        filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.2))"
      />

      {/* Star Accent */}
      <path
        d="M54,40 L56,45 L61,46 L57,50 L58,55 L54,52 L50,55 L51,50 L47,46 L52,45 Z"
        fill="#FFF"
        opacity={unlocked ? 0.95 : 0.4}
      />
    </svg>
  );
}

function Deck100CardsBadge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FADBD8" />
          <stop offset="50%" stopColor="#F5B041" />
          <stop offset="100%" stopColor="#D35400" />
        </linearGradient>
      </defs>
      {/* Shield Base */}
      <path
        d="M50,12 L85,25 L80,65 L50,90 L20,65 L15,25 Z"
        fill="url(#orangeGrad)"
        filter="drop-shadow(0px 4px 5px rgba(0,0,0,0.2))"
      />
      <path d="M50,17 L79,28 L75,62 L50,84 L25,62 L21,28 Z" fill="#6E2C00" />

      {/* Elephant of Memory */}
      <path
        d="M35,62 C35,42 45,35 60,35 C68,35 72,40 72,48 C72,55 68,58 62,58 L54,58 C50,58 48,60 48,64 L48,68 C48,70 45,72 42,72 L38,72 Z"
        fill="url(#orangeGrad)"
      />
      <circle cx="58" cy="45" r="2.5" fill="#5D4037" />

      {/* Trunk details */}
      <path
        d="M35,60 C32,60 28,55 28,48 C28,42 32,40 35,40"
        stroke="#F5B041"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}

function Streak3Badge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4EFDF" />
          <stop offset="50%" stopColor="#52BE80" />
          <stop offset="100%" stopColor="#1E8449" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ABEBC6" />
          <stop offset="100%" stopColor="#27AE60" />
        </linearGradient>
      </defs>
      {/* Leaf Circle Base */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="url(#greenGrad)"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.15))"
      />
      <circle cx="50" cy="50" r="32" fill="#145A32" />

      {/* Triple Leaf Flame */}
      <path
        d="M50,22 C50,22 64,36 64,48 C64,60 50,70 50,70 C50,70 36,60 36,48 C36,36 50,22 50,22 Z"
        fill="url(#leafGrad)"
      />
      <path
        d="M50,28 C50,28 60,40 60,48 C60,56 50,64 50,64 C50,64 40,56 40,48 C40,40 50,28 50,28 Z"
        fill="#D4EFDF"
        opacity="0.3"
      />

      {/* Sprout Detail */}
      <path
        d="M32,48 C32,48 40,44 44,52 C44,52 38,58 32,48 Z"
        fill="url(#greenGrad)"
        transform="rotate(-15 32 48)"
      />
      <path
        d="M68,48 C68,48 60,44 56,52 C56,52 62,58 68,48 Z"
        fill="url(#greenGrad)"
        transform="rotate(15 68 48)"
      />
    </svg>
  );
}

function Streak7Badge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="hotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FADBD8" />
          <stop offset="50%" stopColor="#E74C3C" />
          <stop offset="100%" stopColor="#78281F" />
        </linearGradient>
        <linearGradient id="fireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9E79F" />
          <stop offset="40%" stopColor="#F39C12" />
          <stop offset="100%" stopColor="#E74C3C" />
        </linearGradient>
      </defs>
      {/* Burning Badge Circle */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="url(#hotGrad)"
        filter="drop-shadow(0px 4px 5px rgba(0,0,0,0.25))"
      />
      <circle cx="50" cy="50" r="33" fill="#4A121A" />

      {/* 3D Flame Shape */}
      <path
        d="M50,20 C50,20 68,40 68,54 C68,68 50,78 50,78 C50,78 32,68 32,54 C32,40 50,20 50,20 Z"
        fill="url(#fireGrad)"
        filter="drop-shadow(0px 3px 2px rgba(0,0,0,0.2))"
      />
      <path
        d="M50,35 C50,35 60,48 60,56 C60,64 50,70 50,70 C50,70 40,64 40,56 C40,48 50,35 50,35 Z"
        fill="#FCF3CF"
      />

      {/* Magic Sparkle */}
      {unlocked && (
        <path
          d="M68,26 L70,31 L75,32 L71,35 L72,40 L68,37 L64,40 L65,35 L61,32 L66,31 Z"
          fill="#FFF"
        />
      )}
    </svg>
  );
}

function Streak30Badge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FADBD8" />
          <stop offset="50%" stopColor="#EC407A" />
          <stop offset="100%" stopColor="#880E4F" />
        </linearGradient>
        <linearGradient id="electricGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8F8F5" />
          <stop offset="50%" stopColor="#48C9B0" />
          <stop offset="100%" stopColor="#8E44AD" />
        </linearGradient>
      </defs>
      {/* Electric Star polygon */}
      <polygon
        points="50,8 63,35 92,38 70,58 77,87 50,72 23,87 30,58 8,38 37,35"
        fill="url(#pinkGrad)"
        filter="drop-shadow(0px 4px 5px rgba(0,0,0,0.3))"
      />
      <polygon
        points="50,15 60,37 84,40 66,56 72,80 50,67 28,80 34,56 16,40 40,37"
        fill="#4A0E2E"
      />

      {/* Lightning Lobe Flame */}
      <path
        d="M50,22 C50,22 64,38 64,50 C64,62 50,70 50,70 C50,70 36,62 36,50 C36,38 50,22 50,22 Z"
        fill="url(#electricGrad)"
      />
      {/* Lightning Bolt */}
      <polygon points="50,28 55,42 46,44 52,58 43,58 48,46 52,46" fill="#FFF" />
    </svg>
  );
}

function WorkspaceFirstBadge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F7FA" />
          <stop offset="50%" stopColor="#00ACC1" />
          <stop offset="100%" stopColor="#006064" />
        </linearGradient>
      </defs>
      {/* Squircle Base */}
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        rx="25"
        fill="url(#cyanGrad)"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.18))"
      />
      <rect x="20" y="20" width="60" height="60" rx="20" fill="#00363A" />

      {/* Flagpole and Flag */}
      <rect x="28" y="26" width="4" height="48" rx="2" fill="#D7CCC8" />
      <path
        d="M32,28 L68,36 L68,52 L32,44 Z"
        fill="url(#cyanGrad)"
        filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.15))"
      />
      <path
        d="M32,32 L60,38 L60,48 L32,42 Z"
        fill="#FFF"
        opacity={unlocked ? 0.95 : 0.4}
      />
    </svg>
  );
}

function Workspace5Badge({ unlocked }: { unlocked: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8EAF6" />
          <stop offset="50%" stopColor="#3F51B5" />
          <stop offset="100%" stopColor="#1A237E" />
        </linearGradient>
      </defs>
      {/* Squircle Base */}
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        rx="25"
        fill="url(#indigoGrad)"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.18))"
      />
      <rect x="20" y="20" width="60" height="60" rx="20" fill="#0D1330" />

      {/* 3D Columns Triumphal Arch */}
      {/* Pediment */}
      <polygon points="30,36 70,36 50,26" fill="url(#indigoGrad)" />
      <rect x="28" y="36" width="44" height="4" rx="1" fill="#C5CAE9" />
      {/* Pillars */}
      <rect
        x="34"
        y="40"
        width="6"
        height="28"
        rx="1"
        fill="url(#indigoGrad)"
      />
      <rect
        x="60"
        y="40"
        width="6"
        height="28"
        rx="1"
        fill="url(#indigoGrad)"
      />
      <rect
        x="47"
        y="44"
        width="6"
        height="24"
        rx="1"
        fill="url(#indigoGrad)"
        opacity="0.7"
      />
      {/* Base */}
      <rect x="26" y="68" width="48" height="6" rx="2" fill="#C5CAE9" />
    </svg>
  );
}

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

// ============================================================================
// COMPONENTS
// ============================================================================

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
      className="absolute bottom-[115%] left-1/2 z-200 w-60 p-4 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-2xl pointer-events-none"
    >
      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-xs font-black text-white tracking-tight">
            {title}
          </h4>
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
  apiAchievement,
}: {
  achievement: Achievement;
  stats: ProfileAchievementsProps['stats'];
  streak: ProfileAchievementsProps['streak'];
  apiAchievement?: { unlocked: boolean; unlockedAt: string | null } | null;
}) {
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

/**
 * Main ProfileAchievements Component
 */
export function ProfileAchievements({ stats, streak, achievements }: ProfileAchievementsProps) {
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
    const { unlocked } = getAchievementProgress(achievement.slug, stats, streak, target);
    return unlocked;
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
            {(isExpanded ? ACHIEVEMENTS : initialAchievements).map((achievement) => (
              <AchievementCard
                key={achievement.slug}
                achievement={achievement}
                stats={stats}
                streak={streak}
                apiAchievement={apiAchievementsMap?.get(achievement.slug) ?? null}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
