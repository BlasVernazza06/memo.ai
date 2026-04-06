import { Brain, MessageSquare } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';

export function AiChatFloat() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3 group">
      {/* Tooltip-like popup that shows on hover */}
      <div className="bg-foreground text-background text-sm font-medium px-4 py-3 rounded-2xl shadow-xl shadow-black/10 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none max-w-[240px] border border-border/10">
        <p>¿Tienes dudas? He revisado tus documentos y estoy listo para ayudarte.</p>
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-foreground rotate-45" />
      </div>

      <Button className="h-16 rounded-full px-6 gap-3 bg-foreground hover:bg-foreground/90 text-background shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 border-2 border-background/20">
        <div className="relative flex items-center justify-center w-8 h-8 bg-background/20 rounded-full">
            <Brain className="w-4 h-4 text-background" />
            <span className="absolute top-0 right-0 flex h-2.5 w-2.5 -mt-0.5 -mr-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border-2 border-foreground"></span>
            </span>
        </div>
        <span className="font-black text-base tracking-wide flex items-center gap-2">
            Asistente IA
            <MessageSquare className="w-4 h-4 opacity-70" />
        </span>
      </Button>
    </div>
  );
}
