import Link from 'next/link';
import { Trophy, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import type { QuizWithQuestions } from '@repo/db';
import { Button } from '@repo/ui/components/ui/button';

interface QuizCardProps {
  quiz: QuizWithQuestions;
  index: number;
}

export function QuizCard({ quiz, index }: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-card border border-border/60 rounded-3xl p-6 hover:border-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/5"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform duration-500">
          <Trophy className="w-6 h-6" />
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-600 text-[10px] font-black uppercase tracking-widest">
          {quiz.questions?.length || 0} Preguntas
        </div>
      </div>

      <div className="space-y-1 mb-6">
        <h4 className="font-black text-lg text-foreground group-hover:text-violet-500 transition-colors">
          {quiz.name}
        </h4>
        <p className="text-xs text-muted-foreground/60 font-medium line-clamp-1">
          {quiz.description || 'Evaluación de conocimientos'}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/dashboard/workspaces/${quiz.workspaceId}/quizzes/${quiz.id}`}
          className="flex-1 flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-white font-black rounded-xl h-10 gap-2 shadow-lg shadow-violet-500/20 transition-all"
        >
          <Trophy className="w-4 h-4" />
          Comenzar
        </Link>
        <Button
          variant="outline"
          className="w-10 h-10 p-0 rounded-xl border-border/60 hover:bg-muted"
        >
          <Settings className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </motion.div>
  );
}
