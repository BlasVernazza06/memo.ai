'use client';

import Link from 'next/link';

import { useState } from 'react';

import { FolderPlus, Grid, List } from 'lucide-react';
import { motion } from 'motion/react';

import EmptyDashboardSec from '@/components/dashboard/empty-dashborad-sec';
import SearchInput from '@/components/shared/search-input';

import WorkspaceCard, { Workspace } from './workspace-card';

interface DashWorkspacesSecProps {
  initialWorkspaces: Workspace[];
}

const SEARCH_KEYS: (keyof Workspace)[] = ['name', 'category'];

export default function DashWorkspacesSec({
  initialWorkspaces,
}: DashWorkspacesSecProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorkspaces, setFilteredWorkspaces] =
    useState(initialWorkspaces);

  return (
    <section className="space-y-8">
      {/* Header + Search */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Tus Workspaces
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Gestiona tus áreas de estudio inteligentes.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <SearchInput
            data={initialWorkspaces}
            onResultsChange={setFilteredWorkspaces}
            searchKeys={SEARCH_KEYS}
            placeholder="Buscar por nombre o categoría..."
            className="flex-1 w-full"
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <div className="flex items-center gap-2 p-1 h-max bg-white border border-slate-200/60 rounded-2xl w-full md:w-auto shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 md:flex-none p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 md:flex-none p-2.5 rounded-xl transition-all cursor-pointer ${viewMode === 'list' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Workspaces Grid/List */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
            : 'flex flex-col gap-4'
        }
      >
        {/* Create New Card (Grid only) */}
        {viewMode === 'grid' && (
          <Link href="/dashboard/workspaces/new" className="block h-full">
            <motion.div
              whileHover={{ y: -4 }}
              className="group cursor-pointer border-2 border-dashed border-slate-200 rounded-4xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/40 hover:bg-primary/2 transition-all min-h-[380px] h-full"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-active:scale-95">
                <FolderPlus className="w-8 h-8 text-slate-400 group-hover:text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Nuevo Workspace</h3>
              <p className="text-xs text-slate-400 font-medium">
                Crea un espacio inteligente para tus PDFs
              </p>
            </motion.div>
          </Link>
        )}

        {/* Workspace Cards */}
        {filteredWorkspaces.map((ws, idx) => (
          <WorkspaceCard key={ws.id} ws={ws} idx={idx} viewMode={viewMode} />
        ))}

        {/* Empty State */}
        {filteredWorkspaces.length === 0 && (
          <EmptyDashboardSec setSearchQuery={setSearchQuery} />
        )}
      </motion.div>
    </section>
  );
}
