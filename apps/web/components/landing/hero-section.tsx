'use client';

import Link from 'next/link';

import {
  ArrowRight,
  Brain,
  CheckCircle2,
  FileText,
  Loader2,
  Play,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { motion } from 'motion/react';

import { useAuth } from '@/lib/auth-provider';

import AiSandbox from './ai-sandbox';

interface HeroSectionProps {
  isSandboxOpen: boolean;
  setIsSandboxOpen: (value: boolean) => void;
}

export default function HeroSection({
  isSandboxOpen,
  setIsSandboxOpen,
}: HeroSectionProps) {
  const { user, isLoading: isAuthLoading } = useAuth();

  return (
    <section className="relative pt-16 pb-32 overflow-hidden">
      <AiSandbox
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />

      {/* Subtle Grid Mask - Fades out at bottom */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #1A1C20 1px, transparent 0)`,
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
          }} 
        />
      </div>

      <div className="memo-container relative z-10">
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
              onClick={() => setIsSandboxOpen(true)}
              className="flex items-center gap-3 text-foreground/60 font-bold hover:text-foreground transition-colors py-3 px-6 group"
            >
              <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center shadow-lg group-hover:border-primary/50 transition-colors">
                <Play className="w-4 h-4 fill-current ml-1 text-primary" />
              </div>
              Demo Interactiva
            </button>
          </motion.div>
        </div>

        {/* Visual Mockup - PC/Browser Focused */}
        {/* Visual Mockup Section - 3D PC/Browser Focus */}
        <div className="relative mt-20 mx-auto max-w-6xl perspective-[2000px]">
          
          {/* Background Glows for the Mockup */}
          <div className="absolute -inset-20 bg-primary/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />
          
          {/* Main 3D Tilted Browser */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 15, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 10, rotateY: -5 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotateX: 5, rotateY: -2, scale: 1.01 }}
            className="relative z-20 w-full aspect-[16/10] bg-[#0F1115] rounded-[2rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Premium Browser Header */}
            <div className="h-14 bg-white/[0.03] border-b border-white/[0.08] px-8 flex items-center justify-between backdrop-blur-md">
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.3)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.2)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.3)]" />
              </div>
              <div className="flex items-center gap-2.5 px-6 py-1.5 bg-white/5 border border-white/5 rounded-2xl text-[10px] uppercase font-black tracking-widest text-white/40">
                <Brain className="w-3 h-3 text-primary" />
                <span>memo.ai / dashboard / neurociencia</span>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0F1115] bg-white/10" />
                ))}
              </div>
            </div>

            {/* Dashboard App Grid Mockup */}
            <div className="h-full w-full grid grid-cols-12 overflow-hidden">
              {/* Sidebar Partial */}
              <div className="col-span-3 border-r border-white/5 p-8 space-y-12">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                     <Sparkles className="w-5 h-5 text-white" />
                   </div>
                   <div className="space-y-1.5">
                     <div className="h-3 w-20 bg-white/20 rounded-full" />
                     <div className="h-2 w-12 bg-white/10 rounded-full" />
                   </div>
                </div>
                
                <div className="space-y-6">
                  <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] px-2">Bibliotecas</div>
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${i === 1 ? 'bg-white/10 border border-white/5 shadow-xl' : 'hover:bg-white/5'}`}>
                      <div className={`w-8 h-8 rounded-lg ${i === 1 ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/40'} flex items-center justify-center`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className={`h-2.5 w-24 rounded-full ${i === 1 ? 'bg-white/40' : 'bg-white/10'}`} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Main Area Preview */}
              <div className="col-span-9 p-12 bg-[#0F1115] relative">
                {/* Header within app */}
                <div className="flex items-center justify-between mb-12">
                   <div className="space-y-2">
                     <p className="text-[10px] font-black text-primary uppercase tracking-widest">Workspace Activo</p>
                     <h4 className="text-3xl font-black text-white">Neurociencia Sistémica</h4>
                   </div>
                   <div className="flex items-center gap-4">
                     <div className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-bold text-white/60">Editar</div>
                     <div className="px-5 py-2.5 bg-primary text-white rounded-2xl text-[11px] font-bold shadow-2xl shadow-primary/40">Generar Quiz</div>
                   </div>
                </div>

                <div className="grid grid-cols-12 gap-10">
                  {/* Active Document Card */}
                  <div className="col-span-8 space-y-8">
                     <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8">
                          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary animate-pulse">
                            <Sparkles className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-center gap-3">
                             <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                               <FileText className="w-6 h-6 text-white/60" />
                             </div>
                             <div className="space-y-2">
                               <div className="h-4 w-40 bg-white/40 rounded-full" />
                               <div className="h-2 w-20 bg-white/10 rounded-full" />
                             </div>
                          </div>
                          
                          <div className="pt-8 space-y-4">
                            <h3 className="text-2xl font-bold text-white leading-tight">¿Cómo se propagan los potenciales de acción en el axón?</h3>
                            <div className="h-24 w-full bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col justify-center">
                               <div className="h-3 w-full bg-white/10 rounded-full mb-3" />
                               <div className="h-3 w-2/3 bg-white/10 rounded-full" />
                            </div>
                          </div>
                        </div>
                     </div>
                  </div>

                  {/* Sidebar stats cards */}
                  <div className="col-span-4 space-y-8 pt-4">
                     <div className="bg-primary rounded-[2.5rem] p-10 shadow-2xl shadow-primary/20 group">
                        <Trophy className="w-10 h-10 text-white mb-6 transition-transform group-hover:scale-110" />
                        <div className="space-y-2">
                          <div className="text-4xl font-black text-white">98%</div>
                          <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Dominio alcanzado</div>
                        </div>
                     </div>
                     <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                        <div className="flex -space-x-3">
                           {[1, 2, 3, 4].map(i => (
                             <div key={i} className="w-10 h-10 rounded-full border-4 border-[#0F1115] bg-white/10" />
                           ))}
                           <div className="w-10 h-10 rounded-full border-4 border-[#0F1115] bg-primary flex items-center justify-center text-[10px] font-black text-white">+12</div>
                        </div>
                        <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-primary w-[85%]" />
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* High-End Floating Contextual Cards (Complementing 3D Tilt) */}
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="absolute -left-[10%] top-[20%] z-40"
          >
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl p-8 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-white dark:border-zinc-800 flex flex-col items-center gap-6">
               <div className="w-16 h-16 bg-zinc-950 dark:bg-zinc-100 rounded-[1.5rem] flex items-center justify-center text-white dark:text-zinc-950 shadow-2xl">
                 <Brain className="w-8 h-8" />
               </div>
               <div className="text-center">
                 <div className="text-2xl font-black text-foreground">IA Activa</div>
                 <div className="text-[10px] font-black text-muted-foreground/60 tracking-[0.2em] uppercase mt-2">memo.ai Engine</div>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black">
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                 Contenido IA
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="absolute -right-[8%] bottom-[15%] z-40"
          >
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-white dark:border-zinc-800 space-y-6 min-w-[240px]">
               <div className="flex items-center gap-3 mb-2">
                 <CheckCircle2 className="w-6 h-6 text-green-500" />
                 <span className="text-[11px] font-black uppercase text-muted-foreground/60">Progreso de Blas</span>
               </div>
               <div className="space-y-4">
                 <div className="text-4xl font-black text-foreground tracking-tighter">85%</div>
                 <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-primary" 
                     initial={{ width: 0 }}
                     animate={{ width: '85%' }}
                     transition={{ duration: 2, delay: 1.5 }}
                   />
                 </div>
               </div>
               <p className="text-[10px] font-medium text-muted-foreground/80 leading-relaxed max-w-[160px]">
                 &quot;Estudiar con IA ha duplicado mi velocidad de retención.&quot;
               </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

