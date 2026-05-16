import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { QuizQuestionDTO } from '@repo/validators';

interface QuizProgressBarProps {
  currentQuestionIndex: number;
  isAnswered: boolean;
  questions: QuizQuestionDTO[];
  results: (null | 'correct' | 'incorrect')[];
}

export default function QuizProgressBar({
  currentQuestionIndex,
  isAnswered,
  questions,
  results,
}: QuizProgressBarProps) {
  return (
    <div className="space-y-4 py-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
        <span className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
          Pregunta {currentQuestionIndex + 1}
        </span>
        <span>{questions.length} Total</span>
      </div>
      
      <div className="relative h-8 flex items-center group">
        {/* Base Track - More visible */}
        <div className="absolute left-0 right-0 h-2 bg-slate-200/50 dark:bg-slate-800/50 rounded-full" />

        {/* Dynamic Colored Segments */}
        <div className="absolute left-0 right-0 h-2 flex px-0.5">
          {questions.map((_, idx) => {
            if (idx === questions.length - 1) return null;
            
            const result = results[idx];
            const isCompleted = idx < currentQuestionIndex || (idx === currentQuestionIndex && isAnswered);
            
            return (
              <div 
                key={`seg-${idx}`} 
                className="h-full relative"
                style={{ width: `${100 / (questions.length - 1)}%` }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`h-full rounded-full transition-colors duration-500 ${
                    result === 'correct' 
                      ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                      : result === 'incorrect' 
                        ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                        : 'bg-primary'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Checkpoints */}
        <div className="absolute left-0 right-0 flex justify-between items-center">
          {questions.map((_, idx) => {
            const status = results[idx];
            const isActive = idx === currentQuestionIndex;
            const isPast = idx < currentQuestionIndex;

            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  scale: status ? 1.2 : isActive ? 1.1 : 1,
                }}
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10
                  ${
                    status === 'correct'
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : status === 'incorrect'
                        ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30'
                        : isActive
                          ? 'bg-background border-primary ring-4 ring-primary/15 scale-110 shadow-md'
                          : isPast
                            ? 'bg-primary/10 border-primary/30'
                            : 'bg-background border-slate-300 dark:border-slate-700 shadow-sm'
                  }
                `}
              >
                {status === 'correct' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-3.5 h-3.5 stroke-[4]" />
                  </motion.div>
                )}
                {status === 'incorrect' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <X className="w-3.5 h-3.5 stroke-[4]" />
                  </motion.div>
                )}
                {!status && isActive && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2.5 h-2.5 rounded-full bg-primary"
                  />
                )}
                {!status && !isActive && !isPast && (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
