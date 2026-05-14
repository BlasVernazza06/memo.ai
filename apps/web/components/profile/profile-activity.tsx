'use client';

import {
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
} from 'lucide-react';
import { motion } from 'motion/react';

const ACTIVITY = [
  {
    action: 'Estudiaste Anatomía II',
    date: 'Hace 20 min',
    icon: BookOpen,
  },
  {
    action: 'Creaste 24 flashcards',
    date: 'Hace 2 horas',
    icon: Award,
  },
  {
    action: 'Subiste Marketing.pdf',
    date: 'Ayer, 18:30',
    icon: FileText,
  },
];

export function ProfileActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-[2rem] p-5 shadow-sm flex flex-col"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-black text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Actividad
        </h3>
        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded-full">
          7d
        </span>
      </div>

      <div className="space-y-2 relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border/40 rounded-full" />

        {ACTIVITY.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-start gap-2.5 group cursor-pointer relative z-10"
          >
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:scale-105 transition-all duration-300 shrink-0 border border-border/50 shadow-xs">
              <item.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            
            <div className="flex-1 min-w-0 pt-0.5 border-b border-border/10 pb-2 group-last:border-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-black text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {item.action}
                  </p>
                  <p className="text-[9px] text-muted-foreground font-bold flex items-center gap-1 pt-0.5">
                    <Calendar className="w-2.5 h-2.5 opacity-40" />
                    {item.date}
                  </p>
                </div>
                <ChevronRight className="w-3 h-3 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3">
        <button className="w-full py-2 rounded-lg bg-muted/50 hover:bg-muted text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all border border-border/10">
          Ver historial
        </button>
      </div>
    </motion.div>
  );
}
