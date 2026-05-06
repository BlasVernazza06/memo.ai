import Link from 'next/link';
import { useState } from 'react';
import { Brain, ChevronRight } from 'lucide-react';
import type { DbQuiz } from '@repo/db';
import SearchInput from '@/components/shared/search-input';

export default function QuizzesList({ quizzes }: { quizzes: DbQuiz[] }) {
  const [filtered, setFiltered] = useState(quizzes);

  return (
    <div className="space-y-8">
      <SearchInput
        data={quizzes}
        onResultsChange={setFiltered}
        placeholder="Buscar quizzes..."
      />

      {filtered.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center text-muted-foreground mb-2">
             <Brain className="w-8 h-8 opacity-50" />
          </div>
          <p className="text-muted-foreground font-medium text-lg">
            No hay cuestionarios aún.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((quiz) => {
            const questionCount = quiz.questions?.length || 0;
            return (
              <Link
                key={quiz.id}
                href={`/dashboard/workspaces/${quiz.workspaceId}/quizzes/${quiz.id}`}
                className="bg-gradient-to-br from-card to-card/30 border border-white/5 dark:border-white/5 p-6 rounded-[2rem] flex flex-col gap-4 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-400 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-colors duration-500 pointer-events-none" />

                <div className="flex items-start justify-between relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 text-emerald-500 shadow-inner rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-background/50 border border-border/50 flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                     <ChevronRight className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
                <div className="space-y-3 mt-auto relative z-10">
                  <div className="space-y-1">
                    <h4 className="font-black text-foreground text-lg sm:text-xl tracking-tight group-hover:text-emerald-500 transition-colors duration-300 line-clamp-1">
                      {quiz.name}
                    </h4>
                    <p className="text-sm text-muted-foreground/80 font-medium line-clamp-1">
                      {quiz.description || 'Evalúa tus conocimientos aquí.'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/40 pt-4">
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest bg-background/60 shadow-inner px-3 py-1.5 rounded-lg border border-border/30">
                      {questionCount} Preguntas
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
