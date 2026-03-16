'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Grid, List, Plus } from 'lucide-react';
import { motion } from 'motion/react';

import EmptyDashboardSec from '@/components/dashboard/empty-dashborad-sec';
import WorkspaceCard from '@/components/dashboard/workspace-card';
import SearchInput from '@/components/shared/search-input';

import type { Workspace } from '@/types/workspaces';

interface DashWorkspacesSecProps {
  workspaces?: Workspace[]; // Renamed for compatibility
  initialWorkspaces?: Workspace[]; // Added for backwards compatibility
}

export default function DashWorkspacesSec({
  workspaces: providedWorkspaces,
  initialWorkspaces,
}: DashWorkspacesSecProps) {
  // Use either workspaces or initialWorkspaces, defaulting to empty array
  const workspaces = providedWorkspaces || initialWorkspaces || [];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredWorkspaces = workspaces.filter((ws) =>
    ws && ws.name ? ws.name.toLowerCase().includes(searchQuery.toLowerCase()) : false
  );

  return (
    <section className="space-y-8">
      {/* Redesigned Header: Premium & Integrated */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-border/80">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
             <h2 className="text-3xl font-black text-foreground tracking-tight">
              Mis <span className="text-primary italic">Espacios</span>
            </h2>
            <div className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-wider">
              {filteredWorkspaces.length}
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-bold flex items-center gap-2">
            Gestiona tus bibliotecas y recursos de estudio
          </p>
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
              <div className="absolute inset-0 rounded-2xl border-2 border-border/10 group-hover/search:border-primary/20 pointer-events-none transition-colors" />
            </div>
          </div>

          {/* Premium View Switcher */}
          <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-2xl border border-border/50 shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-card text-primary shadow-sm ring-1 ring-border/50' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Vista de cuadrícula"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                viewMode === 'list' 
                  ? 'bg-card text-primary shadow-sm ring-1 ring-border/50' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Vista de lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {filteredWorkspaces.length === 0 ? (
        <EmptyDashboardSec setSearchQuery={setSearchQuery} />
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
            <Link href="/dashboard/workspaces/new" className="block h-full group/new">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="relative border-2 border-dashed border-border/60 rounded-[2.5rem] flex items-center justify-center min-h-[400px] hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer overflow-hidden p-8"
              >
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-muted/50 border border-border flex items-center justify-center group-hover/new:scale-110 group-hover/new:bg-primary transition-all duration-500 shadow-md group-hover/new:shadow-primary/20">
                    <Plus className="w-8 h-8 text-muted-foreground group-hover/new:text-primary-foreground transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-foreground italic">Nuevo Proyecto</h3>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">
                      Comienza una nueva biblioteca con IA
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          {filteredWorkspaces.map((ws, idx) => (
            <WorkspaceCard
              key={ws.id}
              ws={ws}
              idx={idx}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </section>
  );
}
