'use client';

import {
  Trophy,
  Sparkles,
  Brain,
  BookOpen,
  Zap,
  Target,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { WorkspaceDetailDTO } from '@repo/validators';

interface WorkspaceInsightsColumnProps {
  workspace: WorkspaceDetailDTO;
}

export function WorkspaceInsightsColumn({
  workspace,
}: WorkspaceInsightsColumnProps) {
  // 1. Calcular Dominio Real
  const decks = workspace.flashcardDecks || [];
  let totalCards = 0;
  let totalMastery = 0;

  decks.forEach((d) => {
    if (Array.isArray(d.flashcards)) {
      d.flashcards.forEach((c: any) => {
        totalCards++;
        totalMastery += c.mastery || 0;
      });
    }
  });

  const averageMastery = totalCards > 0 ? Math.round(totalMastery / totalCards) : 0;
  const totalQuizzes = workspace.quizzes?.length || 0;
  const totalDecks = workspace.flashcardDecks?.length || 0;
  const primaryDoc = workspace.documents?.[0];

  return (
    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 lg:flex lg:flex-col gap-6 lg:sticky lg:top-8">
      {/* 1. DOMINIO GLOBAL (Nivel de Maestría del Workspace) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-950 border border-slate-900 text-white rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/15 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/25 transition-all duration-500" />
        
        <div className="flex items-center gap-2 mb-6 opacity-40">
          <Trophy className="w-3.5 h-3.5 text-yellow-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Dominio Global
          </span>
        </div>

        <div className="flex flex-col items-center gap-5 mb-6">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* SVG Circular Progress con efecto resplandor */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="48"
                className="stroke-white/5 fill-none"
                strokeWidth="7"
              />
              <motion.circle
                cx="56"
                cy="56"
                r="48"
                className="stroke-primary fill-none transition-all duration-1000"
                strokeWidth="7"
                strokeDasharray="301.6"
                initial={{ strokeDashoffset: 301.6 }}
                animate={{ strokeDashoffset: 301.6 * (1 - averageMastery / 100) }}
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col items-center justify-center relative">
              <span className="font-black text-3xl tracking-tighter bg-linear-to-r from-white to-slate-350 bg-clip-text text-transparent">
                {averageMastery}
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-primary mt-0.5">%</span>
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="font-black text-md leading-tight text-white">
              {averageMastery >= 80
                ? '¡Dominio Excelente!'
                : averageMastery >= 50
                  ? 'Progreso Sólido'
                  : averageMastery >= 20
                    ? 'En Buen Camino'
                    : 'Iniciando Aprendizaje'}
            </h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              {totalCards} {totalCards === 1 ? 'Concepto' : 'Conceptos'} en Total
            </p>
          </div>
        </div>

        {/* Pequeño grid de datos abajo */}
        <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/5">
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
              Mazos
            </p>
            <p className="font-black text-sm text-slate-200">
              {totalDecks}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
              Quizzes
            </p>
            <p className="font-black text-sm text-slate-200">
              {totalQuizzes}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. RECOMENDACIONES DE REPASO IA (Widget Premium y Dinámico) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-card border border-border/40 rounded-[2.5rem] p-6 shadow-xs relative overflow-hidden group hover:shadow-md hover:border-primary/20 transition-all duration-300"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-all duration-500" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <h3 className="font-black text-[10px] uppercase tracking-widest text-foreground">
              Memo IA Sugiere
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[12px] text-muted-foreground leading-relaxed font-semibold">
            {averageMastery < 30 ? (
              <>
                Has cargado el tema <strong>{workspace.name}</strong>. Te recomendamos repasar las <strong>flashcards iniciales</strong> para fijar los conceptos básicos antes de tomar tu primer cuestionario.
              </>
            ) : averageMastery < 70 ? (
              <>
                ¡Buen avance en <strong>{workspace.name}</strong>! Es hora de desafiarte realizando un <strong>quiz personalizado</strong> para consolidar los conocimientos intermedios.
              </>
            ) : (
              <>
                ¡Increíble dominio del tema! Estás listo para tomar el control absoluto. Revisa los conceptos que te resulten más difíciles y alcanza el 100% de maestría.
              </>
            )}
          </p>

          {/* Tarjeta de objetivo rápido interactivo */}
          <div className="bg-muted/30 border border-border/20 rounded-2xl p-3 flex items-center justify-between group/action hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-foreground">Siguiente Meta</p>
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-tight mt-0.5">
                  {averageMastery < 50 ? 'Subir al 50% de Dominio' : 'Alcanzar el 90%'}
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover/action:text-primary group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5 transition-all" />
          </div>
        </div>
      </motion.div>

      {/* 3. RESUMEN DE MATERIAL DEL WORKSPACE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-muted/20 border border-border/30 rounded-[2.5rem] p-6 shadow-2xs space-y-4"
      >
        <h3 className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
          Detalle del Workspace
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-1.5 border-b border-border/20">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-bold text-foreground">Documento Fuente</span>
            </div>
            <span className="text-[9.5px] font-black text-muted-foreground max-w-[120px] truncate" title={primaryDoc?.name}>
              {primaryDoc?.name || 'Texto Personalizado'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-border/20">
            <div className="flex items-center gap-2.5">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-[10px] font-bold text-foreground">Conceptos Clave</span>
            </div>
            <span className="text-[9.5px] font-black text-muted-foreground">
              {totalCards} Tarjetas
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-2.5">
              <Brain className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-bold text-foreground">Cuestionarios</span>
            </div>
            <span className="text-[9.5px] font-black text-muted-foreground">
              {totalQuizzes} Disponibles
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
