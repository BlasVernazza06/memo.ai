import Link from 'next/link';

import { ChevronLeft, Heart, Settings, Sparkles, MessageSquare } from 'lucide-react';

import type { WorkspaceWithRelations } from '@repo/db';
import { Button } from '@repo/ui/components/ui/button';

interface WorkspaceHeaderProps {
  workspace: WorkspaceWithRelations;
  isFav: boolean;
  onLike: () => void;
  onSettings: () => void;
}

export function WorkspaceHeader({
  workspace,
  isFav,
  onLike,
  onSettings,
}: WorkspaceHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Top Actions & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-foreground transition-all bg-card/60 hover:bg-card backdrop-blur-md border border-border/50 py-2.5 px-5 rounded-full shadow-sm hover:shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
            Workspaces
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-foreground shrink-0 bg-muted/40 px-3 py-1.5 rounded-full border border-border/30">
            {workspace.category || 'General'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onLike}
            variant="ghost"
            className={`rounded-full w-12 h-12 p-0 shadow-sm transition-all duration-300 active:scale-90 ${
              isFav
                ? 'bg-gradient-to-br from-rose-500/20 to-rose-500/5 border border-rose-500/30 text-rose-500 shadow-rose-500/10'
                : 'bg-card/60 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-rose-500 hover:border-rose-500/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-current scale-110' : 'scale-100'} transition-transform`} />
          </Button>
          <Button
            onClick={onSettings}
            variant="ghost"
            className="rounded-full w-12 h-12 p-0 bg-card/60 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-foreground shadow-sm transition-all duration-300 hover:rotate-90 active:scale-90"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Header Banner Premium */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-card to-card/40 border border-white/5 dark:border-white/5 rounded-[2rem] p-6 md:p-8 shadow-2xl shadow-black/5 relative overflow-hidden group">
        
        {/* Glows de ambiente */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-1000" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-1000" />

        {workspace.coverImage && (
          <div
            className="absolute top-0 right-0 w-2/3 h-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 pointer-events-none"
            style={{
              backgroundImage: `url(${workspace.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to left, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
            }}
          />
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 relative z-10 w-full">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/10 rounded-[1.5rem] flex items-center justify-center text-3xl md:text-4xl shrink-0 group-hover:scale-105 transition-transform duration-500">
            {workspace.icon || '📚'}
          </div>
          
          <div className="space-y-3 flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 tracking-tight">
              {workspace.name}
            </h1>
            <p className="text-muted-foreground/80 font-medium text-sm md:text-base line-clamp-2 max-w-2xl leading-relaxed">
              {workspace.description ||
                'Transforma tus apuntes en conocimiento interactivo con IA.'}
            </p>
            
            {/* Pill Custom Context Premium */}
            {workspace.customContext && (
               <div className="inline-flex items-center gap-2 mt-2 bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-inner px-4 py-1.5 rounded-xl text-xs font-bold w-max max-w-full">
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="truncate max-w-[200px] md:max-w-md">Instrucción: {workspace.customContext}</span>
               </div>
            )}
          </div>
        </div>
        
        <div className="shrink-0 relative z-10 mt-6 md:mt-0">
          <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-blue-600 text-white font-black rounded-2xl h-14 px-8 gap-2.5 shadow-xl shadow-primary/25 border border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 group/btn">
            <Sparkles className="w-5 h-5 group-hover/btn:animate-pulse" />
            <span className="text-base tracking-wide">Estudiar Ahora</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
