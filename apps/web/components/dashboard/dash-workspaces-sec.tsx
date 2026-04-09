'use client';

import Link from 'next/link';

import { useState } from 'react';

import { Grid, List, Plus } from 'lucide-react';
import { motion } from 'motion/react';

import EmptySearchWorkspaceSec from '@/components/dashboard/empty-search-workspace-sec';
import EmptyWorkspacesSec from '@/components/dashboard/empty-workspaces-sec';
import WorkspaceCard from '@/components/dashboard/workspace-card';
import SearchInput from '@/components/shared/search-input';
import type { Workspace } from '@/types/workspaces';

interface DashWorkspacesSecProps {
  workspaces?: Workspace[];
  initialWorkspaces?: Workspace[];
}

const normalizeString = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export default function DashWorkspacesSec({
  workspaces: providedWorkspaces,
  initialWorkspaces,
}: DashWorkspacesSecProps) {
  const workspaces = providedWorkspaces || initialWorkspaces || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredWorkspaces = workspaces.filter((ws) => {
    if (!ws || !ws.name) return false;
    return normalizeString(ws.name).includes(normalizeString(searchQuery));
  });

  return (
    <section className="space-y-12">
      {/* Refined Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-border/40">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Mis Espacios
            </h2>
            <div className="px-2.5 py-0.5 rounded-full bg-muted border border-border/60 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              {filteredWorkspaces.length}
            </div>
          </div>
          <p className="text-sm text-muted-foreground/80 font-medium">
            Gestiona tus bibliotecas y recursos de estudio con IA.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80 group">
            <SearchInput
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={setSearchQuery}
              variant="compact"
              className="transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-primary/20"
            />
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-1 p-1.5 bg-muted/40 backdrop-blur-sm rounded-2xl border border-border/40 relative h-12 w-24">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 flex items-center justify-center rounded-xl transition-all duration-300 relative z-10 h-full ${
                viewMode === 'grid'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 flex items-center justify-center rounded-xl transition-all duration-300 relative z-10 h-full ${
                viewMode === 'list'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List className="w-4.5 h-4.5" />
            </button>
            <motion.div
              layoutId="switcher-pill"
              animate={{ x: viewMode === 'grid' ? 0 : 42 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              className="absolute left-1.5 top-1.5 bottom-1.5 w-[42px] bg-card rounded-xl shadow-md border border-border/20 pointer-events-none"
            />
          </div>
        </div>

        {/* Subtle Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border/60 to-transparent" />
      </div>

      {workspaces.length === 0 ? (
        <EmptyWorkspacesSec />
      ) : filteredWorkspaces.length === 0 ? (
        <EmptySearchWorkspaceSec setSearchQuery={setSearchQuery} />
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
              : 'flex flex-col gap-4'
          }
        >
          {/* New Project Card */}
          {viewMode === 'grid' && !searchQuery && (
            <Link href="/dashboard/workspaces/new" className="group h-full">
              <motion.div
                whileTap={{ scale: 0.99 }}
                className="relative border-2 border-dashed border-border/80 rounded-[2.5rem] flex flex-col items-center justify-center min-h-[400px] hover:border-primary/50 hover:bg-primary/5 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative background glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
                
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 group-hover:rotate-6 transition-all duration-500">
                  <Plus className="w-8 h-8 text-primary shadow-sm" />
                </div>
                <div className="mt-8 text-center space-y-3 relative z-10">
                  <h3 className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                    Nuevo Proyecto
                  </h3>
                  <p className="text-[11px] font-extrabold text-muted-foreground/60 uppercase tracking-[0.2em] leading-relaxed max-w-[200px] mx-auto">
                    Comienza una nueva biblioteca con IA
                  </p>
                </div>
              </motion.div>
            </Link>
          )}

          {filteredWorkspaces.map((ws, idx) => (
            <WorkspaceCard key={ws.id} ws={ws} idx={idx} viewMode={viewMode} />
          ))}
        </div>
      )}
    </section>
  );
}
