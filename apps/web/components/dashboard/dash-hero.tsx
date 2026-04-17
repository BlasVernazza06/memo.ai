'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Carrd } from '@ridemountainpig/svgl-react';
import {
  BookOpen,
  Brain,
  CardSim,
  FileCheck,
  FileText,
  IdCardIcon,
  Network,
  Plus,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Documenso } from 'svgl-react';

import { Button } from '@repo/ui/components/ui/button';

import { useAuth } from '@/lib/auth-provider';

export default function DashHero({
  summary,
}: {
  summary: { workspaces: number; docs: number; flashcards: number };
}) {
  const { user } = useAuth();
  const [showTutorial, setShowTutorial] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tutorialSteps = [
    {
      icon: Brain,
      title: 'Dale contexto',
      desc: 'Cuéntale a la IA qué quieres estudiar y cómo prefieres aprender.',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      icon: FileText,
      title: 'Sube tu material',
      desc: 'Sube un PDF o texto y deja que la IA lo procese por ti.',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      icon: Target,
      title: 'Domina el tema',
      desc: 'Usa los resúmenes, flashcards y tests generados para aprender más rápido.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden border border-border/80 rounded-[2.5rem] bg-card p-6 md:p-10 text-foreground shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] transition-all"
      >
        {/* Decorative Background Assets */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute -top-[10%] -right-[5%] w-[50%] h-full bg-primary/10 dark:bg-primary/20 blur-[120px] rounded-full animate-pulse transition-all duration-[3000ms]" />
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1.5px 1.5px, currentColor 1.5px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Left Column: Core Content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground"
              >
                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                <span>
                  Hola de nuevo, {user?.name?.split(' ')[0] || 'Blas'}
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] italic max-w-xl">
                ¿Qué vamos a{' '}
                <span className="text-primary not-italic relative inline-block group/learn">
                  aprender
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -bottom-1 left-0 h-1.5 bg-primary/20 rounded-full blur-[2px]"
                  />
                </span>{' '}
                hoy?
              </h1>

              <p className="text-muted-foreground text-sm md:text-xl font-medium max-w-lg leading-relaxed opacity-80">
                Transforma tus apuntes en conocimiento interactivo con el poder
                de la IA.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/dashboard/workspaces/new">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-primary-foreground px-7 py-3 rounded-xl font-black shadow-lg shadow-primary/20 flex items-center gap-2.5 transition-all cursor-pointer text-sm"
                >
                  <Plus className="w-5 h-5" />
                  <span className="tracking-tight">Nuevo Workspace</span>
                </motion.button>
              </Link>

              <motion.button
                onClick={() => setShowTutorial(true)}
                className="bg-muted text-muted-foreground border border-border px-7 py-3 rounded-xl font-black transition-all flex items-center gap-2.5 text-sm cursor-pointer hover:bg-background hover:text-foreground"
              >
                <BookOpen className="w-4 h-4 opacity-70" />
                Tutorial
              </motion.button>
            </div>

            {/* Compact Status Row */}
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-8 border-t border-border/40">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group/stat flex items-center gap-4 cursor-default"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                  <div className="relative size-12 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center text-primary">
                    <Network className="size-6" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.15em] leading-none mb-1">
                    Proyectos
                  </p>
                  <p className="text-2xl font-black tracking-tight">
                    {summary.workspaces}
                  </p>
                </div>
              </motion.div>

              <div className="hidden sm:block w-px h-10 bg-border/30" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="group/stat flex items-center gap-4 cursor-default"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                  <div className="relative size-12 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center text-blue-500">
                    <FileCheck className="size-6" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.15em] leading-none mb-1">
                    Docs
                  </p>
                  <p className="text-2xl font-black tracking-tight">
                    {summary.docs}
                  </p>
                </div>
              </motion.div>

              <div className="hidden sm:block w-px h-10 bg-border/30" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="group/stat flex items-center gap-4 cursor-default"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                  <div className="relative size-12 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center text-emerald-500">
                    <IdCardIcon className="size-6" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.15em] leading-none mb-1">
                    Flashcards
                  </p>
                  <p className="text-2xl font-black tracking-tight">
                    {summary.flashcards}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Mini Floating Card */}
          <div className="hidden lg:flex shrink-0 pr-4">
            <motion.div
              animate={{
                rotateY: [0, 8, 0],
                rotateX: [0, -5, 0],
                y: [0, -12, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[240px] aspect-[4/5] bg-card/40 backdrop-blur-[32px] rounded-[3rem] border border-white/20 dark:border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.6)] p-7 flex flex-col justify-between overflow-hidden relative group/card"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 relative">
                  <div className="absolute inset-0 bg-primary rounded-2xl animate-ping opacity-20" />
                  <FileText className="w-6 h-6 text-primary-foreground relative z-10" />
                </div>
                <div className="flex -space-x-2.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-background bg-muted shadow-sm"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="h-3 w-4/5 bg-primary/20 rounded-full animate-pulse" />
                <div className="h-3 w-full bg-muted/60 rounded-full" />
                <div className="h-3 w-3/4 bg-muted/40 rounded-full" />
              </div>
              <div className="pt-5 border-t border-border/20 space-y-3 relative z-10">
                <div className="flex justify-between items-center text-[9px] font-black uppercase text-muted-foreground tracking-tighter">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Procesando...
                  </span>
                  <span className="text-primary font-black">92%</span>
                </div>
                <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-1/2 h-full bg-linear-to-r from-transparent via-primary to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tutorial Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {showTutorial && (
              <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowTutorial(false)}
                  className="absolute inset-0 bg-background/80 backdrop-blur-md"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 10 }}
                  className="relative bg-card border border-border rounded-4xl w-full max-w-lg overflow-hidden shadow-2xl"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-foreground uppercase tracking-tight">
                          Tutorial
                        </h2>
                      </div>
                      <button
                        onClick={() => setShowTutorial(false)}
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {tutorialSteps.map((step, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div
                            className={`w-10 h-10 shrink-0 ${step.bg} ${step.color} rounded-xl flex items-center justify-center text-sm font-bold`}
                          >
                            {i + 1}
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-sm">{step.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => setShowTutorial(false)}
                      className="w-full mt-8 h-12 bg-foreground text-background font-black rounded-xl hover:opacity-90"
                    >
                      Entendido
                    </Button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
