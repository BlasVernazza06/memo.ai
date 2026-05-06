import Link from 'next/link';

import { GraduationCap, Search } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

export default function EmptyQuizPage({ hasSearch }: { hasSearch?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-card/20 border border-dashed border-border rounded-[2.5rem]">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
        {hasSearch ? (
          <Search className="w-10 h-10 text-muted-foreground" />
        ) : (
          <GraduationCap className="w-10 h-10 text-muted-foreground" />
        )}
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
