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
          className={`relative bg-card dark:bg-card/45 backdrop-blur-2xl border border-border/60 shadow-[0_12px_45px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_45px_80px_-25px_rgba(var(--primary),0.2)] hover:border-primary/40 transition-all duration-500 overflow-hidden h-full ${
            viewMode === 'grid'
              ? 'rounded-[2.8rem] flex flex-col h-[420px]'
              : 'rounded-[1.8rem] flex flex-row items-center justify-between md:gap-8 min-h-[120px] p-6'
          }`}
        >
          {/* Advanced Shine Effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover/ws:opacity-100 transition-opacity duration-1000" />
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/ws:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -inset-[100%] bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover/ws:translate-x-[200%] pointer-events-none z-30" />
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
                  className={`flex items-center justify-center shrink-0 relative overflow-hidden ${
                    viewMode === 'grid'
                      ? 'w-16 h-16 bg-card border border-border/30 rounded-[1.5rem] shadow-[0_8px_16px_-4px_rgba(0,0,0,0.04)] group-hover/ws:border-primary/40 group-hover/ws:bg-background transition-all duration-500'
                      : 'w-14 h-14 bg-card rounded-[1.25rem] border border-border/40 shadow-sm'
                  }`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover/ws:opacity-100 transition-opacity" />
                  <Icon
                    className={`w-7 h-7 relative z-10 transition-transform duration-500 group-hover/ws:scale-110 ${viewMode === 'grid' ? 'text-primary' : 'text-primary/70'}`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3
                  className={`font-black text-foreground group-hover/ws:text-primary transition-colors line-clamp-1 italic ${viewMode === 'grid' ? 'text-xl' : 'text-xl'}`}
                >
                  {ws.name}
                </h3>
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-2 uppercase tracking-[0.1em] opacity-60">
                    <Files className="w-3.5 h-3.5" />
                    Biblioteca Activa
                  </p>
                  <p className="text-[10px] text-primary font-black flex items-center gap-2 uppercase tracking-[0.15em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    {ws.flashcards || 0} Flashcards
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

              <div className="bg-muted/50 text-muted-foreground group-hover/ws:bg-primary group-hover/ws:text-primary-foreground group-hover/ws:shadow-lg group-hover/ws:shadow-primary/30 rounded-2xl shadow-sm transition-all duration-500 h-12 w-12 flex items-center justify-center border border-border group-hover/ws:border-primary/50 cursor-pointer">
                <ChevronRight className="w-6 h-6 group-hover/ws:translate-x-1 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
