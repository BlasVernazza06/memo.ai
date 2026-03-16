'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import {
  BookOpen,
  Brain,
  FileText,
  Plus,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

export default function DashHero() {
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
        <div className="absolute inset-0 grain-overlay opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute -top-[10%] -right-[5%] w-[40%] h-full bg-primary/5 dark:bg-primary/10 blur-[100px] rounded-full animate-blob transition-all duration-1000" />
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '32px 32px',
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
                <Sparkles className="w-3 h-3 text-primary" />
                <span>Hola de nuevo, Blas</span>
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight italic max-w-xl">
                ¿Qué vamos a{' '}
                <span className="text-primary not-italic relative inline-block">
                  aprender
                  <span className="absolute -bottom-1 left-1 right-0 h-1 bg-primary/20 rounded-full blur-sm" />
                </span>{' '}
                hoy?
              </h1>

              <p className="text-muted-foreground text-sm md:text-lg font-bold max-w-lg leading-relaxed">
                Transforma tus apuntes en conocimiento interactivo con IA.
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
            <div className="flex flex-wrap gap-8 pt-6 border-t border-border/50">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                    Docs
                  </p>
                  <p className="text-lg font-black">12</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-border/30 pl-8">
                <div className="text-center">
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                    Cards
                  </p>
                  <p className="text-lg font-black">850</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-border/30 pl-8">
                <div className="text-center text-emerald-600 dark:text-emerald-400">
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                    Racha
                  </p>
                  <p className="text-lg font-black">
                    5 <span className="text-[8px] italic font-bold">Días</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mini Floating Card */}
          <div className="hidden lg:flex shrink-0 pr-4">
            <motion.div
              animate={{
                rotateY: [0, 5, 0],
                y: [0, -8, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[220px] aspect-[4/5] bg-card/50 backdrop-blur-xl rounded-4xl border border-border shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-6 flex flex-col justify-between overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-background bg-muted"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2.5 w-3/4 bg-primary/10 rounded-full animate-pulse" />
                <div className="h-2.5 w-full bg-muted rounded-full" />
                <div className="h-2.5 w-2/3 bg-muted rounded-full" />
              </div>
              <div className="pt-4 border-t border-border/40 space-y-2">
                <div className="flex justify-between items-center text-[8px] font-black uppercase text-muted-foreground">
                  <span>Procesando...</span>
                  <span className="text-primary">85%</span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1/3 h-full bg-primary"
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
          document.body
        )}
    </section>
  );
}
