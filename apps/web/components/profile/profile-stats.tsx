'use client';

import {
  Award,
  Check,
  FileText,
  Flame,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

import { DbStreake } from '@repo/db';
import { cn } from '@repo/ui/utils';

import { AuthUser } from '@/lib/auth-provider';

const STATS = [
  {
    label: 'Documentos',
    value: '48',
    icon: FileText,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    label: 'Flashcards',
    value: '1.2k',
    icon: Award,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    label: 'Consultas IA',
    value: '320',
    icon: MessageSquare,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
];

const WEEK_DAYS = [
  { label: 'Lu', active: true, today: false },
  { label: 'Ma', active: true, today: false },
  { label: 'Mi', active: true, today: false },
  { label: 'Ju', active: true, today: true },
  { label: 'Vi', active: false, today: false },
  { label: 'Sa', active: false, today: false },
  { label: 'Do', active: false, today: false },
];

interface ProfileStatsProps {
  user: AuthUser | null | undefined;
  streak: DbStreake;
}

export function ProfileStats({ user, streak }: ProfileStatsProps) {
  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border/50 rounded-3xl p-6 flex flex-col gap-4 shadow-xs hover:shadow-md hover:border-primary/20 transition-all group"
          >
            <div
              className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110',
                stat.bg,
                stat.color,
              )}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <p className="text-2xl font-black text-foreground tracking-tight">
                {stat.value}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Professional Premium Streak Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-orange-500 rounded-[2.5rem] p-8 shadow-2xl shadow-orange-500/20 relative overflow-hidden group border border-orange-400/20"
      >
        {/* Abstract Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-600/50 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-10">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                  <Flame className="w-6 h-6 text-white fill-white" />
                </div>
                <h3 className="text-5xl font-black text-white tracking-tighter">
                  {streak?.currentStreak || 12} Días
                </h3>
              </div>
              <p className="text-orange-100/80 text-sm font-bold flex items-center gap-2 mt-2">
                ¡Es un pájaro, es un avión... ES{' '}
                {user?.name?.toUpperCase() || 'ESTUDIANTE'}!
                <Sparkles className="w-4 h-4 fill-white text-white" />
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 flex items-center justify-center shadow-inner">
                <Flame className="w-12 h-12 text-white fill-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* Connected Days Timeline */}
          <div className="relative">
            {/* Labels Row */}
            <div className="flex items-center justify-between mb-6 px-1">
              {WEEK_DAYS.map((day, i) => (
                <span
                  key={i}
                  className={cn(
                    'text-[10px] font-black uppercase tracking-widest w-11 text-center transition-colors',
                    day.active || day.today ? 'text-white' : 'text-white/40',
                  )}
                >
                  {day.label}
                </span>
              ))}
            </div>

            {/* Path and Circles Container */}
            <div className="relative">
              {/* The Connecting Line (Path) */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white/20 -translate-y-1/2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '57%' }} // Adjusted to match the last active day
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
              </div>

              {/* Circles Row */}
              <div className="flex items-center justify-between relative z-10">
                {WEEK_DAYS.map((day, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 border-4',
                        day.active
                          ? 'bg-white border-white text-orange-600 shadow-lg scale-110'
                          : day.today
                            ? 'bg-orange-500 border-white/60 text-white animate-pulse scale-105'
                            : 'bg-orange-600 border-transparent text-white/20',
                      )}
                    >
                      {day.active ? (
                        <Check className="w-5 h-5 stroke-[4]" />
                      ) : (
                        <div
                          className={cn(
                            'w-2.5 h-2.5 rounded-full',
                            day.today ? 'bg-white' : 'bg-white/20',
                          )}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
