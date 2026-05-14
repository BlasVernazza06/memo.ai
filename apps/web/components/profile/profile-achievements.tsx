'use client';

import {
  BookOpen,
  Brain,
  ChevronRight,
  Flame,
  Lock,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

const BADGES = [
  {
    name: 'Cerebro de Oro',
    icon: Brain,
    color: 'from-yellow-400 via-orange-500 to-amber-600',
    glow: 'shadow-orange-500/10',
    unlocked: true,
  },
  {
    name: 'Lector Voraz',
    icon: BookOpen,
    color: 'from-blue-400 via-indigo-500 to-blue-600',
    glow: 'shadow-blue-500/10',
    unlocked: true,
  },
  {
    name: 'Velocista',
    icon: Flame,
    color: 'from-rose-400 via-red-500 to-pink-600',
    glow: 'shadow-rose-500/10',
    unlocked: true,
  },
  {
    name: 'Curioso Pro',
    icon: Sparkles,
    color: 'from-violet-400 via-purple-500 to-fuchsia-600',
    glow: 'shadow-violet-500/10',
    unlocked: false,
  },
];

export function ProfileAchievements() {
  const unlockedCount = BADGES.filter((b) => b.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h3 className="text-lg font-black text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Logros
          </h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            {unlockedCount} de {BADGES.length} desbloqueados
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-lg font-bold text-[10px] uppercase tracking-widest flex gap-2 h-8 px-3 border-border/50"
        >
          Ver Todos <ChevronRight className="w-3 h-3" />
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {BADGES.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -2 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className={`flex flex-col items-center text-center gap-2 group ${!badge.unlocked ? 'opacity-30 grayscale' : ''}`}
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-linear-to-br ${badge.color} p-0.5 shadow-lg ${badge.glow} group-hover:scale-105 transition-all duration-300 relative`}
            >
              <div className="w-full h-full rounded-[0.9rem] bg-background flex items-center justify-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-linear-to-br ${badge.color} opacity-5`} />
                <badge.icon className="w-6 h-6 text-foreground relative z-10" />
              </div>
              {!badge.unlocked && (
                <div className="absolute inset-0 rounded-2xl bg-background/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
            <p className="font-black text-foreground text-[10px] tracking-tight truncate w-full">{badge.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress hint */}
      <div className="bg-muted/30 border border-border/30 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden group">
        <div className="w-8 h-8 bg-yellow-500/5 rounded-lg flex items-center justify-center shrink-0 border border-yellow-500/10">
          <Sparkles className="w-4 h-4 text-yellow-600/50" />
        </div>
        <p className="text-[10px] text-muted-foreground font-medium">
          Completa <span className="font-bold text-foreground">5 quizzes más</span> para obtener &quot;Curioso Pro&quot;
        </p>
      </div>
    </motion.div>
  );
}
