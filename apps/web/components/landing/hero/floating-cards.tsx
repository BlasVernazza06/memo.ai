'use client';

import { motion } from 'motion/react';
import { Brain, CheckCircle2, Flame, Zap } from 'lucide-react';

export function FloatingCards() {
  return (
    <>
      {/* AI Active Card — left */}
      <motion.div
        initial={{ opacity: 0, x: -60, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-[8%] top-[18%] z-40"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-[0_24px_50px_rgba(0,0,0,0.12)] border border-white/80 dark:border-zinc-800 flex flex-col items-center gap-5"
        >
          <div className="w-14 h-14 bg-zinc-950 dark:bg-zinc-100 rounded-[1.2rem] flex items-center justify-center text-white dark:text-zinc-950 shadow-xl">
            <Brain className="w-7 h-7" />
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-foreground">IA Activa</div>
            <div className="text-[9px] font-black text-muted-foreground/60 tracking-[0.2em] uppercase mt-1">memo.ai Engine</div>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary rounded-full text-[9px] font-black tracking-wider uppercase border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Procesando
          </div>
        </motion.div>
      </motion.div>

      {/* Progress Card — right */}
      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-[6%] bottom-[18%] z-40"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl p-7 rounded-[2.5rem] shadow-[0_24px_50px_rgba(0,0,0,0.12)] border border-white/80 dark:border-zinc-800 space-y-5 min-w-[220px]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-wider">Sesión de Hoy</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-black text-amber-500 uppercase tracking-wider">
              <Flame className="w-3 h-3" />
              7 días
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-foreground tracking-tighter">85%</div>
            <div className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-widest mt-0.5">Dominio alcanzado</div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 2, delay: 1.5, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground/60 font-semibold">
              <Zap className="w-3 h-3 text-primary" />
              +12 flashcards dominadas hoy
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
