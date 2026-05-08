'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Loader2, Play, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth-provider';

interface HeroContentProps {
  onOpenSandbox: () => void;
}

export function HeroContent({ onOpenSandbox }: HeroContentProps) {
  const { user, isLoading: isAuthLoading } = useAuth();

  return (
    <div className="flex flex-col items-center text-center">
      {/* High-End Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-black uppercase tracking-[0.2em] mb-10 shadow-sm backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Memo AI v2.0 - Revolucionando el Estudio</span>
      </motion.div>

      {/* Majestic Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-8xl font-black text-foreground max-w-5xl tracking-tight leading-[1] mb-8"
      >
        Convierte tus apuntes en{' '}
        <span className="relative inline-block">
          <span className="text-primary italic">Conocimiento</span>
          {/* Subtle underline wave */}
          <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 200 12" fill="none">
            <path d="M4 8C30 8 40 2 70 2C100 2 110 8 140 8C170 8 180 2 206 2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
        <br />
        en segundos
      </motion.h1>

      {/* Refined Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl leading-relaxed mb-12 font-medium"
      >
        Sube tus documentos y deja que nuestra IA genere flashcards inteligentes, quizzes dinámicos y analíticas en tiempo real. Domina cualquier tema en tiempo récord.
      </motion.p>

      {/* Strategic CTA area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center gap-6 mb-24"
      >
        {isAuthLoading ? (
          <div className="bg-primary/10 px-10 py-5 rounded-3xl flex items-center justify-center">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        ) : (
          <Link
            href={user ? '/dashboard' : '/auth/register'}
            className="flex items-center gap-2"
          >
            <button className="bg-foreground text-background px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98]">
              {user ? 'Mi Dashboard' : 'Empezar ahora'}
              <div className="w-8 h-8 rounded-full bg-background/10 dark:bg-black/10 flex items-center justify-center group">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </Link>
        )}

        <button
          onClick={onOpenSandbox}
          className="flex items-center gap-3 text-foreground/60 font-bold hover:text-foreground transition-colors py-3 px-6 group"
        >
          <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center shadow-lg group-hover:border-primary/50 transition-colors">
            <Play className="w-4 h-4 fill-current ml-1 text-primary" />
          </div>
          Demo Interactiva
        </button>
      </motion.div>
    </div>
  );
}
