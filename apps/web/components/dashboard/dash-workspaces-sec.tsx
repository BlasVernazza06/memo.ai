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
  workspaces?: Workspace[]; // Renamed for compatibility
  initialWorkspaces?: Workspace[]; // Added for backwards compatibility
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
  // Use either workspaces or initialWorkspaces, defaulting to empty array
  const workspaces = providedWorkspaces || initialWorkspaces || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredWorkspaces = workspaces.filter((ws) => {
    if (!ws || !ws.name) return false;
    return normalizeString(ws.name).includes(normalizeString(searchQuery));
  });

  return (
    <section className="space-y-10">
      {/* Redesigned Header: Premium & Integrated */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-border/10">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-black text-foreground tracking-tighter">
              Mis <span className="text-primary italic">Espacios</span>
            </h2>
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(var(--primary),0.2)]">
              {filteredWorkspaces.length}
            </div>
          </div>
          <div className="flex items-center gap-2 group/help cursor-help">
            <span className="w-1 h-4 bg-primary/30 rounded-full" />
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest opacity-80 group-hover/help:opacity-100 transition-opacity">
              Gestiona tus bibliotecas y recursos de estudio
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Proportional Search Bar */}
          <div className="relative w-full sm:w-64 group">
            <div className="relative group/search">
              <SearchInput
                placeholder="Filtrar..."
                value={searchQuery}
                onChange={setSearchQuery}
                variant="compact"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md border border-border bg-muted/50 text-[10px] font-black text-muted-foreground/50 opacity-0 group-hover/search:opacity-100 transition-opacity pointer-events-none uppercase tracking-tighter">
                Ctrl+K
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-border/10 group-hover/search:border-primary/20 pointer-events-none transition-colors" />
            </div>
          </div>

          {/* Premium View Switcher */}
          <div className="flex items-center gap-1 p-1 bg-muted/40 backdrop-blur-md rounded-2xl border border-border/40 shadow-xs relative overflow-hidden h-[44px] w-[80px]">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 flex items-center justify-center rounded-xl transition-all duration-500 cursor-pointer relative z-10 h-full ${
                viewMode === 'grid'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Vista de cuadrícula"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 flex items-center justify-center rounded-xl transition-all duration-500 cursor-pointer relative z-10 h-full ${
                viewMode === 'list'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Vista de lista"
            >
              <List className="w-4 h-4" />
            </button>
            <motion.div
              layoutId="switcher-pill"
              initial={false}
              animate={{ x: viewMode === 'grid' ? 0 : 36 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute left-1 top-1 bottom-1 w-[36px] bg-card rounded-xl shadow-sm border border-border/10 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {workspaces.length === 0 ? (
        <EmptyWorkspacesSec />
      ) : filteredWorkspaces.length === 0 ? (
        <EmptySearchWorkspaceSec setSearchQuery={setSearchQuery} />
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pt-4'
              : 'flex flex-col gap-4 pt-4'
          }
        >
          {/* Create New Card (only in grid mode and when not searching) */}
          {viewMode === 'grid' && !searchQuery && (
            <Link
              href="/dashboard/workspaces/new"
              className="block h-full group/new"
            >
            <motion.div
                whileTap={{ scale: 0.98 }}
                className="relative border-2 border-dashed border-border/40 rounded-[2.8rem] flex items-center justify-center min-h-[420px] hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-500 cursor-pointer overflow-hidden p-8 group/new-card"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/new-card:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="flex flex-col items-center gap-8 text-center relative z-10">
                  <div className="w-24 h-24 rounded-[2rem] bg-muted/40 border border-border flex items-center justify-center group-hover/new-card:scale-110 group-hover/new-card:bg-primary group-hover/new-card:border-primary transition-all duration-700 shadow-md group-hover/new-card:shadow-[0_20px_40px_rgba(var(--primary),0.25)]">
                    <Plus className="w-10 h-10 text-muted-foreground/60 group-hover/new-card:text-primary-foreground transition-all duration-500" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-foreground italic tracking-tight">
                      Nuevo Proyecto
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[220px] opacity-70 group-hover/new-card:opacity-100 transition-opacity">
                      Comienza una nueva biblioteca con IA
                    </p>
                  </div>
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
