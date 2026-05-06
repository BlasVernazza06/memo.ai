'use client';

import { useState } from 'react';
import { Brain, ClipboardCheck, GraduationCap, Trophy } from 'lucide-react';
import SearchInput from '@/components/shared/search-input';
import { QuizCard } from '@/components/dashboard/quizzes/list/quiz-card';
import EmptyQuizPage from '@/components/dashboard/quizzes/shared/empty-quiz-page';

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

export default function QuizzesList({
  initialQuizzes,
}: {
  initialQuizzes: QuizWithContext[];
}) {
  const [filteredQuizzes, setFilteredQuizzes] =
    useState<QuizWithContext[]>(initialQuizzes);

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">
              Evaluaciones
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Mis <span className="text-muted-foreground/50">Quizzes</span>
          </h1>
          <p className="text-muted-foreground">
            Pone a prueba tus conocimientos con cuestionarios personalizados.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchInput
            data={initialQuizzes}
            onResultsChange={setFilteredQuizzes}
            searchKeys={['name', 'description']}
            placeholder="Buscar quiz..."
            variant="compact"
            className="w-full sm:w-64"
          />
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Exámenes Totales',
            value: initialQuizzes.length,
            icon: ClipboardCheck,
            color: 'text-emerald-500',
          },
          {
            label: 'Preguntas Respondidas',
            value: initialQuizzes.reduce((acc, q) => acc + q.totalQuestions, 0),
            icon: Brain,
            color: 'text-orange-500',
          },
          {
            label: 'Mejor Puntuación',
            value: '92%',
            icon: Trophy,
            color: 'text-yellow-500',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl bg-background ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                {stat.label}
              </p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid of Quizzes */}
      {filteredQuizzes.length === 0 ? (
        <EmptyQuizPage hasSearch={initialQuizzes.length > 0} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz, idx) => (
            <QuizCard key={quiz.id} quiz={quiz} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
