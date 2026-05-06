import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@repo/ui/components/ui/button';

export default function EmptyWorkspacesSec() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
      <div className="w-24 h-24 bg-muted rounded-4xl flex items-center justify-center mb-4 border border-border shadow-inner group transition-all hover:scale-105">
        <Plus className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-foreground italic shadow-xs">
          Crea tu primer Workspace
        </h3>
        <p className="text-muted-foreground max-w-xs font-bold uppercase text-[10px] tracking-widest leading-relaxed">
          Comienza organizando tus estudios y recursos con la ayuda de la IA.
        </p>
      </div>
      <Link href="/dashboard/workspaces/new">
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-black border-border rounded-2xl px-8 h-12 transition-all cursor-pointer active:scale-95 shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Crear Workspace
        </Button>
      </Link>
    </div>
  );
}
