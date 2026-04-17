'use client';

import Link from 'next/link';

import {
  Calendar,
  ChevronRight,
  ClipboardCheck,
  LayoutGrid,
} from 'lucide-react';
import { motion } from 'motion/react';

import { Badge } from '@repo/ui/components/ui/badge';

interface QuizWithContext {
  id: string;
  name: string;
  description: string | null;
  totalQuestions: number;
  workspaceId: string;
  createdAt: string;
  workspace: {
    id: string;
    name: string;
  };
}

export function QuizCard({
  quiz,
  index,
}: {
  quiz: QuizWithContext;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link
        href={`/dashboard/workspaces/${quiz.workspaceId}/quizzes/${quiz.id}`}
        className="block"
      >
        <div className="relative h-full bg-card hover:bg-card/80 border border-border/50 hover:border-primary/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5">
          {/* Aesthetic Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-emerald-500/20 transition-colors" />

          <div className="p-6 flex flex-col h-full gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-none"
              >
                {quiz.totalQuestions} questions
              </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                {quiz.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {quiz.description || 'Sin descripción disponible.'}
              </p>
            </div>

            <div className="mt-auto pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{quiz.workspace?.name || 'Workspace'}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
                  Comenzar{' '}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
