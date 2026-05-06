import { Layers, Sparkles } from 'lucide-react';

export default function EmptyTabState({ tabName }: { tabName: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div className="w-24 h-24 bg-card rounded-full shadow-lg flex items-center justify-center mx-auto text-muted-foreground border border-border relative">
        <Sparkles className="w-10 h-10 absolute animate-pulse text-primary/50" />
        <Layers className="w-8 h-8 opacity-50" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-foreground">
          Generando {tabName}
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto font-medium">
          Nuestra inteligencia artificial está destilando tus documentos para
          crear este material de estudio optimizado.
        </p>
      </div>
    </div>
  );
}
