'use client';

import { useState } from 'react';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { Brain, Calendar, ChevronRight, ClipboardCheck, GraduationCap, LayoutGrid, Plus, Trophy, Search, Layers } from 'lucide-react';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import SearchInput from '@/components/shared/search-input';

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

export default function QuizzesList({ initialQuizzes }: { initialQuizzes: QuizWithContext[] }) {
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizWithContext[]>(initialQuizzes);

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
        <EmptyState hasSearch={initialQuizzes.length > 0} />
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

function QuizCard({
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
                <span>{quiz.workspace.name}</span>
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

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-card/20 border border-dashed border-border rounded-[2.5rem]">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
        {hasSearch ? <Search className="w-10 h-10 text-muted-foreground" /> : <GraduationCap className="w-10 h-10 text-muted-foreground" />}
      </div>
      <h2 className="text-2xl font-bold mb-2">
        {hasSearch ? 'No se encontraron resultados' : 'No hay quizzes aún'}
      </h2>
      <p className="text-muted-foreground max-w-sm mb-8">
        {hasSearch 
          ? 'Intenta con otros términos de búsqueda o revisa que el nombre sea correcto.' 
          : 'La IA generará cuestionarios basados en tus documentos una vez que los subas a un workspace.'}
      </p>
      <Link href={hasSearch ? '#' : '/dashboard'}>
        <Button 
            className="rounded-full px-8" 
            onClick={hasSearch ? () => window.location.reload() : undefined}
        >
            {hasSearch ? 'Limpiar búsqueda' : 'Explorar Workspaces'}
        </Button>
      </Link>
    </div>
  );
}
