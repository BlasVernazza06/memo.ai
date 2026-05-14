'use client';

import { Brain, FileText, GraduationCap, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileStatsProps {
  stats?: {
    documents: number;
    flashcards: number;
    quizzes: number;
  };
}

export function ProfileStats({
  stats = { documents: 0, flashcards: 0, quizzes: 0 },
}: ProfileStatsProps) {
  const statsConfig = [
    {
      label: 'Biblioteca',
      value: stats.documents,
      icon: FileText,
      description: 'Documentos subidos',
    },
    {
      label: 'Flashcards',
      value: stats.flashcards,
      icon: Brain,
      description: 'Tarjetas creadas',
    },
    {
      label: 'Práctica',
      value: stats.quizzes,
      icon: GraduationCap,
      description: 'Quizzes completados',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
        {statsConfig.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-card border border-border/50 rounded-[1.5rem] p-5 shadow-sm hover:border-border transition-all duration-300 h-full flex flex-col"
          >
            <div className="relative z-10 flex flex-col gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center transition-all duration-300 group-hover:scale-105 border border-border/50 shadow-xs">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="space-y-0.5 flex-1">
                <div className="flex items-baseline gap-1.5">
                  <p className="text-2xl font-black text-foreground tracking-tight">
                    {stat.value}
                  </p>
                  <TrendingUp className="w-3.5 h-3.5 text-muted-foreground/50" />
                </div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>

              <p className="text-[10px] font-bold text-muted-foreground/40 uppercase pt-1 border-t border-border/10 mt-auto">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
