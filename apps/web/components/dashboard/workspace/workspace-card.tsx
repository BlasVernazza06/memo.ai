'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import {
  BookOpen,
  Brain,
  ChevronRight,
  Clock,
  Files,
  Heart,
  Layers,
  LucideIcon,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

import { formatDate } from '@/hooks/use-formate-date';
import { apiFetchClient } from '@/lib/api-client';
import type { Workspace } from '@/types/workspaces';

const ICON_MAP: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  brain: Brain,
  files: Files,
  layers: Layers,
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
  const [isFavorite, setIsFavorite] = useState(ws.isFavorite || false);
  const Icon = ICON_MAP[ws.icon || ''] || Files;

  const handleLike = async () => {
    // Optimistic update
    const previous = isFavorite;
    setIsFavorite(!previous);

    try {
      await apiFetchClient(`/workspaces/${ws.id}/like`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setIsFavorite(previous);
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: idx * 0.05 }}
        className="group/ws relative"
      >
        <Link
          href={`/dashboard/workspaces/${ws.id}`}
          className="flex items-center gap-5 p-4 rounded-2xl bg-card border border-border/40 hover:border-primary/40 hover:bg-muted/30 transition-all duration-200 active:scale-[0.995]"
        >
          {/* List Icon */}
          <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 group-hover/ws:bg-primary/10 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>

          {/* List Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground truncate group-hover/ws:text-primary transition-colors">
              {ws.name}
            </h3>
            <div className="flex items-center gap-4 mt-0.5">
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                <Clock className="w-3 h-3 opacity-60" />
                {formatDate(ws.createdAt)}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary/80 uppercase tracking-wider">
                  <Zap className="w-3 h-3" />
                  {ws.flashcards || 0} Flashcards
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600/80 uppercase tracking-wider">
                  <Brain className="w-3 h-3" />
                  {ws.quizzesCount || 0} Quizzes
                </span>
              </div>
            </div>
          </div>

          {/* List Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLike();
              }}
              className="p-2 text-muted-foreground/40 hover:text-rose-500 transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500 font-bold' : ''}`}
              />
            </button>
            <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover/ws:text-primary group-hover/ws:translate-x-0.5 transition-all" />
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      className="group/ws h-full relative"
    >
      <Link href={`/dashboard/workspaces/${ws.id}`} className="block h-full">
        <div className="h-full flex flex-col bg-card rounded-3xl border border-border/60 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group-hover/ws:-translate-y-1 overflow-hidden">
          {/* Minimal Header */}
          <div className="relative h-32 shrink-0 bg-muted/10 overflow-hidden isolate">
            {ws.coverImage ? (
              <Image
                src={ws.coverImage}
                alt={ws.name}
                width={400}
                height={200}
                className="w-full h-full object-cover transform-gpu group-hover/ws:scale-110 transition-transform duration-700 will-change-transform"
              />
            ) : (
              <div
                className="w-full h-full relative transition-all duration-500 group-hover/ws:scale-110 transform-gpu will-change-transform"
                style={{
                  background: `linear-gradient(135deg, ${ws.color || '#3b82f6'}33 0%, ${ws.color || '#3b82f6'}11 100%)`,
                }}
              >
                {/* Decorative mesh/gradient blobs */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-40 animate-pulse"
                  style={{ backgroundColor: ws.color || '#3b82f6' }}
                />
                <div
                  className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: ws.color || '#3b82f6' }}
                />

                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 pointer-events-none" />
              </div>
            )}

            {/* Top Right Actions */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLike();
                }}
                className="w-8 h-8 rounded-lg bg-background/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-foreground/60 hover:text-rose-500 hover:bg-background transition-all"
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500 border-none' : ''}`}
                />
              </button>
            </div>

            {/* Bottom Fade */}
            <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none">
              <div className="h-16 bg-gradient-to-t from-card via-card/95 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-6">
            <div className="flex justify-between items-start mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover/ws:scale-110 group-hover/ws:rotate-3 shadow-sm"
                style={{
                  backgroundColor: `${ws.color || '#3b82f6'}1a`,
                  borderColor: `${ws.color || '#3b82f6'}33`,
                }}
              >
                <Icon
                  className="w-6 h-6"
                  style={{ color: ws.color || '#3b82f6' }}
                />
              </div>
            </div>

            <h3
              className="text-xl font-bold text-foreground mb-2 transition-colors duration-300"
              style={
                {
                  '--hover-color': ws.color || '#3b82f6',
                } as React.CSSProperties
              }
            >
              <span className="group-hover/ws:text-[var(--hover-color)] transition-colors">
                {ws.name}
              </span>
            </h3>

            <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed mb-6 font-medium">
              {ws.description ||
                `Explora y domina conceptos clave de ${ws.name.toLowerCase()} con sesiones de estudio personalizadas.`}
            </p>

            {/* Stats - Grid layout for 2 items */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/20 border border-border/40 group-hover/ws:bg-muted/40 transition-colors">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${ws.color || '#3b82f6'}15` }}
                >
                  <Layers
                    className="w-4 h-4"
                    style={{ color: ws.color || '#3b82f6' }}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">
                    {ws.flashcards || 0}
                  </p>
                  <p className="text-[10px] font-medium text-muted-foreground mt-1 uppercase tracking-tighter">
                    Flashcards
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/20 border border-border/40 group-hover/ws:bg-muted/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">
                    {ws.quizzesCount || 0}
                  </p>
                  <p className="text-[10px] font-medium text-muted-foreground mt-1 uppercase tracking-tighter">
                    Quizzes
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-border/40 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(ws.createdAt)}
              </span>
              <div
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-all duration-300 group-hover/ws:text-white"
                style={
                  {
                    '--hover-bg': ws.color || '#3b82f6',
                  } as React.CSSProperties
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    ws.color || '#3b82f6')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '')
                }
              >
                <ChevronRight className="w-4 h-4 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
