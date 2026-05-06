'use client';

import { Plus } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';

interface EmptyTabListStateProps {
  tabName: string;
  icon: React.ElementType;
}

export function EmptyTabListState({
  tabName,
  icon: Icon,
}: EmptyTabListStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-8 bg-card/20 border border-border/40 rounded-[3rem] border-dashed">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
        <div className="w-20 h-20 bg-background rounded-3xl shadow-xl flex items-center justify-center mx-auto border border-border/50 relative z-10">
          <Icon className="w-8 h-8 text-primary/40" />
        </div>
      </div>
      <div className="space-y-3 max-w-[280px] mx-auto">
        <h3 className="text-xl font-black text-foreground">
          Generando {tabName}
        </h3>
        <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed">
          Nuestra inteligencia artificial está destilando tus documentos para
          crear este material de estudio optimizado.
        </p>
      </div>
      <Button
        variant="ghost"
        className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-full h-10 px-8 border border-primary/10"
      >
        <Plus className="w-3.5 h-3.5 mr-2" />
        Configurar Generación
      </Button>
    </div>
  );
}
