'use client';

import { motion } from 'motion/react';
import { Brain, CheckCircle2 } from 'lucide-react';

export function FloatingCards() {
  return (
    <>
      {/* AI Active Card */}
      <motion.div
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute -left-[10%] top-[20%] z-40"
      >
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl p-8 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-white dark:border-zinc-800 flex flex-col items-center gap-6">
           <div className="w-16 h-16 bg-zinc-950 dark:bg-zinc-100 rounded-[1.5rem] flex items-center justify-center text-white dark:text-zinc-950 shadow-2xl">
             <Brain className="w-8 h-8" />
           </div>
           <div className="text-center">
             <div className="text-2xl font-black text-foreground">IA Activa</div>
             <div className="text-[10px] font-black text-muted-foreground/60 tracking-[0.2em] uppercase mt-2">memo.ai Engine</div>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             Contenido IA
           </div>
        </div>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute -right-[8%] bottom-[15%] z-40"
      >
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-white dark:border-zinc-800 space-y-6 min-w-[240px]">
           <div className="flex items-center gap-3 mb-2">
             <CheckCircle2 className="w-6 h-6 text-green-500" />
             <span className="text-[11px] font-black uppercase text-muted-foreground/60">Progreso de Blas</span>
           </div>
           <div className="space-y-4">
             <div className="text-4xl font-black text-foreground tracking-tighter">85%</div>
             <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-primary" 
                 initial={{ width: 0 }}
                 animate={{ width: '85%' }}
                 transition={{ duration: 2, delay: 1.5 }}
               />
             </div>
           </div>
           <p className="text-[10px] font-medium text-muted-foreground/80 leading-relaxed max-w-[160px]">
             &quot;Estudiar con IA ha duplicado mi velocidad de retención.&quot;
           </p>
        </div>
      </motion.div>
    </>
  );
}
