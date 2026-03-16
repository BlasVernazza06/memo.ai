'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  BookOpen,
  Brain,
  ChevronRight,
  Files,
  Heart,
  LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';

import type { Workspace } from '../../types/workspaces';

const ICON_MAP: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  brain: Brain,
  files: Files,
};

export default function WorkspaceCard({
  ws,
  idx,
  viewMode,
}: {
  ws: Workspace;
  idx: number;
  viewMode: 'grid' | 'list';
}) {
  const Icon = ICON_MAP[ws.icon || ''] || Files;

  return (
    <div className="relative group/ws h-full">
      <Link href={`/dashboard/workspaces/${ws.id}`} className="block h-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: Math.min(idx * 0.08, 0.4) }}
          whileHover={viewMode === 'grid' ? { y: -8, scale: 1.01 } : { x: 6 }}
          className={`relative bg-card dark:bg-card/40 backdrop-blur-xl border border-border/80 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_50px_rgba(var(--primary),0.2)] hover:border-primary/40 transition-all overflow-hidden h-full ${
            viewMode === 'grid'
              ? 'rounded-[2.5rem] flex flex-col h-[400px]'
              : 'rounded-4xl flex flex-row items-center justify-between md:gap-8 min-h-[110px] p-6'
          }`}
        >
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-xl bg-background/50 dark:bg-card/50 backdrop-blur-md border border-border/40 flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:scale-110 active:scale-95 transition-all cursor-pointer group/fav"
          >
            <Heart
              className={`w-5 h-5 ${ws.isFavorite ? 'fill-rose-500 text-rose-500' : ''} group-hover/fav:fill-rose-500 transition-colors`}
            />
          </button>

          {viewMode === 'grid' && (
            <div className="relative h-44 w-full overflow-hidden shrink-0">
              {ws.coverImage ? (
                <Image
                  src={ws.coverImage}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover/ws:scale-110"
                  alt={ws.name}
                />
              ) : (
                <div
                  className={`w-full h-full bg-linear-to-br ${ws.color || 'from-primary to-blue-600'} opacity-90`}
                />
              )}
              {/* Bottom Fade */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-card to-transparent" />
            </div>
          )}

          <div
            className={`p-8 flex flex-col justify-between flex-1 ${viewMode === 'grid' ? '' : 'flex-row items-center gap-6'}`}
          >
            <div
              className={
                viewMode === 'grid'
                  ? 'space-y-4'
                  : 'flex flex-row items-center gap-6 flex-1'
              }
            >
              <div className="flex items-start justify-between relative">
                <div
                  className={`flex items-center justify-center shrink-0 ${
                    viewMode === 'grid'
                      ? 'w-14 h-14 bg-background border border-border rounded-[1.25rem] shadow-sm group-hover/ws:border-primary/20 transition-colors'
                      : 'w-14 h-14 bg-background rounded-2xl border border-border shadow-sm'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3
                  className={`font-black text-foreground group-hover/ws:text-primary transition-colors line-clamp-1 italic ${viewMode === 'grid' ? 'text-xl' : 'text-xl'}`}
                >
                  {ws.name}
                </h3>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[11px] text-muted-foreground font-bold flex items-center gap-2.5 uppercase tracking-wide">
                    <Files className="w-3.5 h-3.5 text-muted-foreground/40" />
                    Fuente Principal Lista
                  </p>
                  <p className="text-[10px] text-primary font-black flex items-center gap-2.5 uppercase tracking-[0.05em]">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {ws.flashcards || 0} Flashcards Activas
                  </p>
                </div>
              </div>
            </div>

            <div
              className={
                viewMode === 'grid'
                  ? 'pt-6 mt-auto border-t border-border flex items-center justify-between'
                  : 'flex items-center gap-8 text-right shrink-0'
              }
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">
                  {ws.lastActive || 'Reciente'}
                </span>
              </div>

              <div className="bg-muted text-muted-foreground group-hover/ws:bg-primary group-hover/ws:text-primary-foreground rounded-2xl shadow-sm transition-all duration-300 h-11 w-11 flex items-center justify-center border border-border group-hover/ws:border-primary cursor-pointer">
                <ChevronRight className="w-6 h-6 group-hover/ws:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
