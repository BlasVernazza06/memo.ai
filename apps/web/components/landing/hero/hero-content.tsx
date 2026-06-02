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
      {/* Premium Announcement Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-primary/5 border border-primary/15 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-xs backdrop-blur-md relative blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br"
      >
        <span className="relative flex size-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full size-1.5 bg-primary"></span>
        </span>
        <span>Memo AI v2.0 — Lab de Estudio</span>
        <Sparkles className="w-3.5 h-3.5 opacity-70" />
      </motion.div>

      {/* Majestic Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground max-w-5xl tracking-tight leading-[0.95] mb-8"
      >
        Convierte tus apuntes en <br />
        <span className="relative inline-block font-serif italic text-primary font-normal tracking-wide px-3 select-none">
          Conocimiento Activo
          <span className="absolute -bottom-1 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </span>
        <br />
        en segundos
      </motion.h1>

      {/* Refined Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl leading-relaxed mb-12 font-medium"
      >
        Sube tus documentos y deja que nuestra IA genere{' '}
        <span className="text-foreground font-semibold">flashcards inteligentes</span>,{' '}
        <span className="text-foreground font-semibold">quizzes dinámicos</span> y analíticas
        en tiempo real. Domina cualquier tema en tiempo récord.
      </motion.p>

      {/* Strategic CTA area */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="flex flex-col sm:flex-row items-center gap-6 mb-24 relative z-10"
      >
        {isAuthLoading ? (
          <div className="bg-primary/10 px-10 py-5 rounded-xl flex items-center justify-center border border-primary/20">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        ) : (
          <Link
            href={user ? '/dashboard' : '/auth/register'}
            className="flex items-center gap-2"
          >
            <button className="group bg-foreground text-background px-10 py-5 rounded-xl font-black text-lg flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] border border-foreground/10 btn-tactile">
              {user ? 'Mi Dashboard' : 'Empezar ahora'}
              <div className="w-8 h-8 rounded-lg bg-background/10 dark:bg-black/10 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </Link>
        )}

        <button
          onClick={onOpenSandbox}
          className="flex items-center gap-3 text-foreground/60 font-bold hover:text-foreground transition-colors py-3 px-6 group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shadow-lg group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all">
            <Play className="w-4 h-4 fill-current ml-0.5 text-primary" />
            <span className="absolute inset-0 rounded-xl bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </div>
          <span>Ver cómo funciona</span>
        </button>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[10px] font-black text-muted-foreground/45 uppercase tracking-[0.2em]"
      >
        {['Sin tarjeta de crédito', 'Gratis para empezar', '+5,000 estudiantes'].map((item, i) => (
          <span key={item} className="flex items-center gap-2">
            {i > 0 && <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />}
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
