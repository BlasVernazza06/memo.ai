'use client';

import { useState } from 'react';

import { Check, ClipboardCheck, FileText, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

interface AnalysisTabContentProps {
  summary: string;
}

export function AnalysisTabContent({ summary }: AnalysisTabContentProps) {
  // Split into paragraphs by double newlines first
  const rawParagraphs = summary.split(/\n\n+/).filter((p) => p.trim() !== '');

  // For each paragraph, if it's too long, split it into chunks of ~3 sentences for better readability
  const paragraphs = rawParagraphs.flatMap((p) => {
    if (p.length > 400) {
      const sentences = p.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [p];
      const chunks = [];
      for (let i = 0; i < sentences.length; i += 3) {
        chunks.push(
          sentences
            .slice(i, i + 3)
            .join('')
            .trim(),
        );
      }
      return chunks;
    }
    return [p];
  });

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <div>
              <h3 className="font-black text-xl text-foreground tracking-tight">
                Resumen
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

        <div className="relative">
          {/* Decorative side line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-primary/30 via-primary/5 to-transparent -ml-6 md:-ml-10 hidden md:block" />

          <div className="space-y-12 max-w-3xl">
            {paragraphs.map((para, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="relative group"
              >
                {/* Optional divider between major blocks */}
                {i > 0 && (
                  <div className="absolute -top-6 left-0 w-12 h-px bg-primary/10 group-hover:w-24 transition-all duration-500" />
                )}

                <p
                  className={`text-lg md:text-xl text-muted-foreground/90 font-medium selection:bg-primary/20 ${
                    i === 0
                      ? 'first-letter:text-4xl first-letter:font-black first-letter:text-primary first-letter:mt-3'
                      : ''
                  }`}
                >
                  {para.split('**').map((part, j) =>
                    j % 2 === 1 ? (
                      <strong
                        key={j}
                        className="text-foreground font-bold border-b-2 border-primary/20 bg-primary/5 px-1 pb-0.5 rounded-xs transition-colors hover:bg-primary/10"
                      >
                        {part}
                      </strong>
                    ) : (
                      part
                    ),
                  )}
                </p>
              </motion.div>
            ))}
          </div>
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
              onClick={handleCopy}
              variant="outline"
              className="rounded-xl font-black text-[10px] uppercase tracking-widest h-11 px-6 border-border/60 hover:bg-muted relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="copied"
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 15, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-foreground">Copiado</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 15, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    Copiar Texto
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
