import Link from 'next/link';

import { RotateCcw, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

import { getShortId, slugify } from '@/hooks/formats/use-slugify';

export default function QuizCompletedView({
  workspaceId,
  percentage,
  correctAnswers,
  incorrectAnswers,
  restartQuiz,
}: {
  workspaceId: string;
  percentage: number;
  correctAnswers: number;
  incorrectAnswers: number;
  restartQuiz: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-2xl mx-auto space-y-8 text-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl ${
          percentage >= 70
            ? 'bg-emerald-100 text-emerald-500 shadow-emerald-500/20'
            : 'bg-orange-100 text-orange-500 shadow-orange-500/20'
        }`}
      >
        <Trophy className="w-16 h-16" />
      </motion.div>

      <div className="space-y-4">
        <h1 className="text-4xl font-black text-foreground">
          {percentage >= 70 ? '¡Excelente Trabajo!' : 'Buen Intento'}
        </h1>
        <p className="text-muted-foreground font-medium text-lg max-w-md mx-auto">
          Has completado el quiz. Aquí tienes un resumen de tu desempeño.
        </p>
      </div>

      <div className="bg-card border border-border p-8 rounded-4xl w-full shadow-sm">
        <div className="flex justify-center items-end gap-2 mb-2">
          <span className="text-6xl font-black text-foreground">
            {percentage}%
          </span>
          <span className="text-xl font-bold text-muted-foreground mb-2">
            Aciertos
          </span>
        </div>
        <div className="w-full bg-muted h-3 rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ delay: 0.5, duration: 1 }}
            className={`h-full ${percentage >= 70 ? 'bg-emerald-500' : 'bg-orange-500'}`}
          />
        </div>
        <div className="flex justify-between mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <span>{correctAnswers} Correctas</span>
          <span>{incorrectAnswers} Incorrectas</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full pt-6">
        <Button
          onClick={restartQuiz}
          variant="outline"
          className="flex-1 h-14 rounded-2xl border-border text-muted-foreground font-bold hover:bg-muted hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Repetir Quiz
        </Button>
        <Link
          href={`/dashboard/workspaces/${slugify(workspaceId)}-${getShortId(workspaceId)}`}
          className="flex-1 w-full block"
        >
          <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 transition-all active:scale-95">
            Volver al Workspace
          </Button>
        </Link>
      </div>
    </div>
  );
}
