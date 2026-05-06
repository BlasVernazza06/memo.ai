'use client';

import { Trophy, Sparkles, Layers, Brain } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@repo/ui/components/ui/button';
import { Textarea } from '@repo/ui/components/ui/textarea';

interface WorkspaceInsightsColumnProps {
  onGenerateMore: (type: 'flashcards' | 'quizzes', prompt?: string) => void;
  isGenerating?: boolean;
}

export function WorkspaceInsightsColumn({
  onGenerateMore,
  isGenerating = false,
}: WorkspaceInsightsColumnProps) {
  const [prompt, setPrompt] = useState('');
  return (
    <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-8">
      {/* Domain Metrics */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />

        <div className="flex items-center gap-2 mb-8 opacity-40">
          <Trophy className="w-3 h-3" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Dominio Global
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="50"
                className="stroke-white/5 fill-none"
                strokeWidth="8"
              />
              <circle
                cx="56"
                cy="56"
                r="50"
                className="stroke-primary fill-none transition-all duration-1000"
                strokeWidth="8"
                strokeDasharray="314"
                strokeDashoffset={314 * (1 - 0.68)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-black text-2xl tracking-tighter">
              68 <span className="text-xs ml-0.5 opacity-40">%</span>
            </div>
          </div>
          <div className="text-center">
            <p className="font-black text-lg leading-tight">
              Buen Progreso
            </p>
            <p className="text-[10px] font-medium opacity-50 mt-1 uppercase tracking-widest text-balance">
              Superando al 84% de usuarios
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
          <div className="space-y-1">
            <p className="text-[9px] font-bold opacity-30 uppercase">
              Material
            </p>
            <p className="font-black text-base">12/40</p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-bold opacity-30 uppercase">
              Sesiones
            </p>
            <p className="font-black text-base">8 Hoy</p>
          </div>
        </div>
      </div>

      {/* AI Suggestion Tip */}
      <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-4xl p-6 relative group overflow-hidden shadow-sm hover:shadow-md transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />
        <Sparkles className="w-5 h-5 text-primary mb-4" />
        <h3 className="font-black text-xs uppercase tracking-widest mb-2">
          Memo IA Sugiere
        </h3>
        <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">
          Has mejorado en <strong>Teoría de Redes</strong>. Repasemos
          estos conceptos antes de tu próximo quiz.
        </p>
      </div>

      {/* Generate More Section */}
      <div className="bg-primary/5 border border-primary/10 rounded-4xl p-6 space-y-4">
        <h3 className="font-black text-[10px] uppercase tracking-widest opacity-60 flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Expandir Conocimiento
        </h3>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold opacity-40 uppercase ml-1">
              ¿En qué quieres enfocarte? (Opcional)
            </label>
            <Textarea
              placeholder="Ej: Enfócate en los capítulos 3 y 4, o haz preguntas más difíciles..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-none bg-background/50 border-primary/10 rounded-2xl text-xs min-h-[80px] focus-visible:ring-primary/20"
              disabled={isGenerating}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={() => onGenerateMore('flashcards', prompt)}
              disabled={isGenerating}
              variant="outline"
              className="w-full justify-start gap-3 rounded-2xl border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all font-bold group"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs">Más Flashcards</p>
                <p className="text-[9px] opacity-50 font-medium">Nuevos conceptos</p>
              </div>
            </Button>

            <Button
              onClick={() => onGenerateMore('quizzes', prompt)}
              disabled={isGenerating}
              variant="outline"
              className="w-full justify-start gap-3 rounded-2xl border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all font-bold group"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs">Más Quizzes</p>
                <p className="text-[9px] opacity-50 font-medium">Ponte a prueba</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
