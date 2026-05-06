import Link from 'next/link';
import { Layers, Search } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';

export default function EmptyFlashcardPage({ hasSearch }: { hasSearch?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-card/20 border border-dashed border-border rounded-[2.5rem]">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
        {hasSearch ? (
          <Search className="w-10 h-10 text-muted-foreground" />
        ) : (
          <Layers className="w-10 h-10 text-muted-foreground" />
        )}
      </div>
      <h2 className="text-2xl font-bold mb-2">
        {hasSearch ? 'No se encontraron resultados' : 'No tienes mazos aún'}
      </h2>
      <p className="text-muted-foreground max-w-sm mb-8">
        {hasSearch
          ? 'Intenta con otros términos de búsqueda o revisa que el nombre sea correcto.'
          : 'Sube un documento en un workspace para que nuestra IA genere flashcards automáticamente para ti.'}
      </p>
      {hasSearch ? (
        <Button
          className="rounded-full px-8"
          onClick={() => window.location.reload()}
        >
          Limpiar búsqueda
        </Button>
      ) : (
        <Link href="/dashboard">
          <Button className="rounded-full px-8">Ir al Dashboard</Button>
        </Link>
      )}
    </div>
  );
}
