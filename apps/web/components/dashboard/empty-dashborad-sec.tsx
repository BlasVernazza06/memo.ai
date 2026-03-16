import { Layers } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

interface EmptyDashboardSecProps {
  setSearchQuery: (query: string) => void;
}

export default function EmptyDashboardSec({
  setSearchQuery,
}: EmptyDashboardSecProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
      <div className="w-24 h-24 bg-muted rounded-4xl flex items-center justify-center mb-4 border border-border shadow-inner group transition-all hover:scale-105">
        <Layers className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-foreground italic shadow-xs">
          No encontramos resultados
        </h3>
        <p className="text-muted-foreground max-w-xs font-bold uppercase text-[10px] tracking-widest leading-relaxed">
          Prueba con otra palabra clave o crea un nuevo workspace para empezar.
        </p>
      </div>
      <Button
        variant="outline"
        className="text-foreground font-black border-border hover:bg-muted rounded-2xl px-8 h-12 transition-all cursor-pointer active:scale-95 shadow-sm"
        onClick={() => setSearchQuery('')}
      >
        Limpiar búsqueda
      </Button>
    </div>
  );
}
