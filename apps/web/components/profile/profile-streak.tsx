'use client';

import { useMemo } from 'react';

import { Check, Flame, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { cn } from '@repo/ui/utils';
import { StreakDTO } from '@repo/validators';

import {
  buildStreakTimeline,
  getStreakProgressPercent,
} from '@/lib/streak-timeline';

interface ProfileStreakProps {
  user:
    | {
        name?: string | null;
      }
    | null
    | undefined;
  streak: StreakDTO | null;
}

export function ProfileStreak({ user, streak }: ProfileStreakProps) {
  const timelineDays = useMemo(() => buildStreakTimeline(streak), [streak]);
  const progressPercent = useMemo(
    () => getStreakProgressPercent(timelineDays),
    [timelineDays],
  );

  // Detect if today's study activity has been completed
  const hasStudiedToday = useMemo(() => {
    if (!streak || !streak.lastActivity) return false;
    const todayStr = new Date().toDateString();
    const lastActivityStr = new Date(streak.lastActivity).toDateString();
    return todayStr === lastActivityStr;
  }, [streak]);

  const hasActiveStreak = (streak?.currentStreak ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-linear-to-br from-orange-500 to-rose-600 rounded-[2rem] p-8 shadow-xl shadow-orange-500/10 relative overflow-hidden group border border-white/10"
    >
      {/* Abstract Background Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none group-hover:bg-white/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-[60px] -ml-20 -mb-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-xl border border-white/30 shadow-lg">
                <Flame
                  className={cn(
                    'w-6 h-6 text-white fill-white animate-bounce-slow',
                    !hasStudiedToday && 'opacity-70 animate-pulse',
                  )}
                />
              </div>
              <div className="space-y-0">
                <h3 className="text-4xl font-black text-white tracking-tighter leading-none">
                  {streak?.currentStreak || 0} Días
                </h3>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest pt-1">
                  Racha Actual
                </p>
              </div>
            </div>

            <p
              className={cn(
                'text-xs font-bold flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-500',
                hasStudiedToday
                  ? 'text-orange-50/90 bg-white/10 border-white/10'
                  : 'text-amber-100 bg-amber-500/20 border-amber-400/40 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.2)]',
              )}
            >
              {hasStudiedToday ? (
                <>
                  ¡Estás en llamas, {user?.name?.split(' ')[0] || 'Memo'}!
                  <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
                </>
              ) : (
                <>
                  ⚠️ Racha pendiente para hoy. ¡Haz un quiz o flashcard ahora!
                </>
              )}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 bg-black/5 backdrop-blur-md px-5 py-4 rounded-[1.5rem] border border-white/10">
            <div className="text-right">
              <p className="text-white text-lg font-black leading-none">
                {streak?.maxStreak || 0}
              </p>
              <p className="text-white/50 text-[9px] font-black uppercase tracking-widest pt-1">
                Racha Máxima
              </p>
            </div>
          </div>
        </div>

        {/* Connected Days Timeline */}
        <div className="relative pt-2">
          {/* Labels Row */}
          <div className="flex items-center justify-between mb-6 px-1">
            {timelineDays.map((day, i) => (
              <span
                key={i}
                className={cn(
                  'text-[10px] font-black uppercase tracking-widest w-10 text-center transition-all duration-500',
                  day.active || day.today ? 'text-white' : 'text-white/30',
                )}
              >
                {day.label}
              </span>
            ))}
          </div>

          {/* Path and Circles Container */}
          <div className="relative">
            {/* The Connecting Line (Path) */}
            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                className="h-full bg-linear-to-r from-white via-white/80 to-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </div>

            {/* Circles Row */}
            <div className="flex items-center justify-between relative z-10">
              {timelineDays.map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-4',
                      day.active
                        ? 'bg-white border-white text-orange-600 shadow-xl scale-110'
                        : day.today
                          ? hasStudiedToday
                            ? 'bg-white border-white text-orange-600 shadow-xl scale-110'
                            : 'bg-amber-600/40 border-amber-400 border-dashed text-white animate-pulse scale-105 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                          : 'bg-orange-700/30 border-transparent text-white/10 backdrop-blur-md',
                    )}
                  >
                    {day.active || (day.today && hasStudiedToday) ? (
                      <Check className="w-5 h-5 stroke-[4]" />
                    ) : (
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full',
                          day.today
                            ? 'bg-amber-400 animate-ping'
                            : 'bg-white/20',
                        )}
                      />
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
