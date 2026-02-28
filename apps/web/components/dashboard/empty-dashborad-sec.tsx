import { Layers } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

interface EmptyDashboardSecProps {
  setSearchQuery: (query: string) => void;
}

export default function EmptyDashboardSec({
  setSearchQuery,
}: EmptyDashboardSecProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2">
        <Layers className="w-10 h-10 text-slate-200" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">
        No encontramos resultados
      </h3>
      <p className="text-slate-500 max-w-xs font-medium">
        Prueba con otra palabra clave o crea un nuevo workspace.
      </p>
      <Button
        variant="ghost"
        className="text-primary font-bold hover:bg-primary/5 rounded-xl"
        onClick={() => setSearchQuery('')}
      >
        Limpiar búsqueda
      </Button>
    </div>
  );
}
