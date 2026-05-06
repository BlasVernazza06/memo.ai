import { AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

import { Question } from '@/types/quiz';

export default function QuizAnsweredView({
  handleNextQuestion,
  questions,
  currentQuestionIndex,
  question,
}: {
  question: Question;
  handleNextQuestion: () => void;
  questions: Question[];
  currentQuestionIndex: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl space-y-4"
    >
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest mb-1">
        <AlertCircle className="w-4 h-4" />
        Explicación
      </div>
      <p className="text-blue-900 dark:text-blue-300 font-medium leading-relaxed text-sm md:text-base">
        {question?.explanation}
      </p>
      <div className="flex justify-end pt-2">
        <Button
          onClick={handleNextQuestion}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-8 py-6 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          {currentQuestionIndex < questions.length - 1
            ? 'Siguiente Pregunta'
            : 'Ver Resultados'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
