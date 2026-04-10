'use client';

import { Sparkles, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@repo/ui/components/ui/button';

interface AnalysisTabContentProps {
  summary: string;
}

export function AnalysisTabContent({ summary }: AnalysisTabContentProps) {
  // Simple markdown-ish to HTML converter for basic formatting (paragraphs and bold)
  const paragraphs = summary.split('\n\n').filter((p) => p.trim() !== '');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card/40 backdrop-blur-2xl border border-border/40 rounded-[3rem] overflow-hidden shadow-2xl relative"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -ml-32 -mb-32" />

      <div className="p-8 md:p-14 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-lg text-foreground tracking-tight">
                Resumen Ejecutivo
              </h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                Memo AI Intelligence
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end opacity-40">
            <span className="text-[10px] font-black uppercase tracking-widest">
              Análisis Completo
            </span>
            <span className="text-[9px] font-medium font-mono">
              VER. 1.0.42
            </span>
          </div>
        </div>

        <div className="space-y-6 max-w-none">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-base text-muted-foreground/90 leading-relaxed font-medium"
            >
              {para.split('**').map((part, j) =>
                j % 2 === 1 ? (
                  <strong key={j} className="text-foreground font-black">
                    {part}
                  </strong>
                ) : (
                  part
                ),
              )}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-border/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-xl border border-border/50">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Documento Analizado
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-xl font-black text-[10px] uppercase tracking-widest h-11 px-6 border-border/60"
            >
              Copiar Texto
            </Button>
            <Button className="rounded-xl font-black text-[10px] uppercase tracking-widest h-11 px-6 bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              Explorar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
