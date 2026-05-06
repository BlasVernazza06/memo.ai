import { ArrowRight, Brain } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

import { Question, Quiz } from '@/types/quiz';

export default function QuizGamePreview({
  gameStage,
  questions,
  quiz,
  handleStart,
  countdown,
}: {
  gameStage: 'preview' | 'countdown' | 'playing';
  questions: Question[];
  quiz: Quiz;
  handleStart: () => void;
  countdown: number;
}) {
  return (
    <AnimatePresence>
      {gameStage === 'preview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="text-center space-y-8 p-8 max-w-sm w-full mx-4"
          >
            <div className="p-6 bg-primary/10 rounded-3xl w-24 h-24 mx-auto flex items-center justify-center shadow-inner">
              <Brain className="w-12 h-12 text-primary animate-pulse" />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black tracking-tight">
                ¿Listo para el desafío?
              </h3>
              <p className="text-muted-foreground font-semibold text-lg">
                {questions.length} preguntas • {quiz.name}
              </p>
            </div>
            <Button
              onClick={handleStart}
              className="h-16 w-full rounded-2xl text-xl font-black bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 group"
            >
              Comenzar Quiz
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      )}

      {gameStage === 'countdown' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-sm"
        >
          <AnimatePresence>
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.5, opacity: 0, rotate: 20 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
              }}
              className="text-9xl font-black text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.5)] absolute"
            >
              {countdown === 0 ? 'GO!' : countdown}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
