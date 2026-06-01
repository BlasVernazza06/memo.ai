'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  X,
  HelpCircle,
  Check,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface Flashcard {
  question: string;
  answer: string;
}

const SAMPLE_FLASHCARDS: Flashcard[] = [
  {
    question: '¿Qué es la Mitocondria?',
    answer:
      'Es el orgánulo celular encargado de suministrar la mayor parte de la energía necesaria para la respiración y actividad celular (ATP).',
  },
  {
    question: '¿Cuál es la función principal del ADN?',
    answer:
      'Contiene las instrucciones genéticas y hereditarias usadas en el desarrollo, funcionamiento y reproducción de los organismos vivos.',
  },
  {
    question: '¿Qué es la Homeostasis?',
    answer:
      'Es la tendencia a mantener un estado de equilibrio y estabilidad interna en un sistema biológico mediante mecanismos de autorregulación.',
  },
];

export default function AiSandbox({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<'input' | 'processing' | 'results'>('input');
  const [inputText] = useState(
    'La síntesis de proteínas es el proceso por el cual se componen nuevas proteínas a partir de los veinte aminoácidos esenciales. En este proceso, se transcribe el ADN en ARN mensajero y luego se traduce en los ribosomas...',
  );
  const [progress, setProgress] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!isOpen) {
      setStep('input');
      setProgress(0);
      setFlippedCards({});
    }
  }, [isOpen]);

  const handleGenerate = () => {
    setStep('processing');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 25;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setStep('results'), 500);
      }
      setProgress(Math.min(p, 100));
    }, 250);
  };

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-1020 flex items-center justify-center p-4">
        {/* Glassmorphic Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-background/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.3)] overflow-hidden border border-border/50"
        >
          {/* Decorative glowing backdrops */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-border/40 relative z-10">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-md">
                <Sparkles className="size-5.5 text-primary animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-foreground uppercase">
                  Cómo funciona Memo.ai
                </h3>
                <p className="text-xs text-muted-foreground/80 font-bold uppercase tracking-wider">
                  Demostración interactiva en tiempo real
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-muted/40 hover:bg-muted/80 border border-border/40 transition-colors"
            >
              <X className="size-4.5 text-foreground" />
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8 relative z-10">
            {step === 'input' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-muted-foreground/90 uppercase tracking-widest ml-1">
                      Ejemplo de apuntes o texto de estudio:
                    </label>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/20">
                      Entrada de Texto
                    </span>
                  </div>
                  <div className="relative group overflow-hidden rounded-3xl border border-border/80 bg-muted/20 p-6 leading-relaxed text-sm text-foreground/80 font-medium select-none shadow-inner min-h-[160px]">
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
                    &ldquo;{inputText}&rdquo;
                    <div className="mt-6 flex flex-col gap-2 opacity-50">
                      <div className="h-1.5 w-3/4 bg-foreground/10 rounded-full animate-pulse" />
                      <div className="h-1.5 w-1/2 bg-foreground/10 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <p className="text-center text-[10px] text-muted-foreground/75 font-semibold italic mt-2">
                    💡 En la versión completa puedes subir archivos PDF, imágenes o escribir tus apuntes directamente.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleGenerate}
                  className="w-full h-14 bg-foreground hover:bg-foreground/95 text-background rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98]"
                >
                  <span>Generar Material de Estudio</span>
                  <Brain className="size-5 text-primary-foreground fill-primary-foreground" />
                </motion.button>
              </motion.div>
            )}

            {step === 'processing' && (
              <div className="py-10 flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <div className="size-24 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="size-8 text-primary animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h4 className="text-xl font-black tracking-tight text-foreground uppercase">
                    Procesando apuntes con IA...
                  </h4>
                  <p className="text-xs text-muted-foreground font-semibold leading-relaxed max-w-xs">
                    Estamos analizando el texto para extraer los conceptos clave y convertirlos en flashcards.
                  </p>
                </div>

                <div className="w-full max-w-sm h-1.5 bg-muted border border-border/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {step === 'results' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-wider text-xs">
                    <CheckCircle2 className="size-4.5 fill-emerald-500/10 stroke-[2.5]" />
                    <span>¡Listo! 3 Flashcards Creadas</span>
                  </div>
                  <button
                    onClick={() => setStep('input')}
                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-85 flex items-center gap-1.5 transition-opacity"
                  >
                    <RefreshCw className="size-3" /> Reiniciar
                  </button>
                </div>

                {/* Interactive 3D Flashcards Deck */}
                <div className="grid grid-cols-1 gap-4 max-h-[300px] overflow-y-auto pr-1">
                  {SAMPLE_FLASHCARDS.map((card, i) => {
                    const isFlipped = !!flippedCards[i];
                    return (
                      <div
                        key={i}
                        onClick={() => toggleFlip(i)}
                        className="h-[100px] w-full perspective-800 cursor-pointer select-none relative"
                      >
                        <motion.div
                          animate={{ rotateX: isFlipped ? 180 : 0 }}
                          transition={{ duration: 0.5, type: 'spring', stiffness: 120, damping: 15 }}
                          className="w-full h-full relative preserve-3d rounded-2xl border border-border/50 shadow-sm"
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {/* Front Side */}
                          <div
                            className="absolute inset-0 backface-hidden bg-card hover:bg-muted/10 border-2 border-border/40 hover:border-primary/20 rounded-2xl px-6 py-4 flex items-center justify-between text-left transition-colors"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            <div className="flex items-center gap-4">
                              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0">
                                <HelpCircle className="size-5" />
                              </div>
                              <div className="space-y-0.5">
                                <p className="text-[9px] font-black text-primary/80 uppercase tracking-widest">
                                  PREGUNTA {i + 1}
                                </p>
                                <h4 className="text-sm font-bold text-foreground leading-snug">
                                  {card.question}
                                </h4>
                              </div>
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 bg-muted border border-border/40 px-2.5 py-1.5 rounded-full shrink-0">
                              Ver Respuesta 💡
                            </span>
                          </div>

                          {/* Back Side */}
                          <div
                            className="absolute inset-0 backface-hidden bg-zinc-950 text-white rounded-2xl px-6 py-4 flex items-center gap-4 text-left border-2 border-zinc-800"
                            style={{
                              transform: 'rotateX(180deg)',
                              backfaceVisibility: 'hidden',
                            }}
                          >
                            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
                              <Check className="size-5 stroke-[2.5]" />
                            </div>
                            <div className="space-y-0.5 pr-4">
                              <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                                RESPUESTA
                              </p>
                              <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                                {card.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Call To Action */}
                <div className="pt-4 border-t border-border/40">
                  <div className="bg-primary/5 rounded-[1.5rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-primary/10 relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
                    <div className="text-center sm:text-left relative z-10">
                      <p className="text-sm font-bold text-foreground">
                        ¿Quieres subir tus propios apuntes?
                      </p>
                      <p className="text-[11px] text-muted-foreground/80 font-medium mt-1 leading-relaxed">
                        Crea una cuenta gratis para generar quizzes interactivos y flashcards ilimitadas.
                      </p>
                    </div>
                    <Link href="/auth/register" className="w-full sm:w-auto relative z-10">
                      <button className="w-full h-11 bg-foreground hover:bg-foreground/95 text-background text-xs font-black uppercase tracking-wider px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.97]">
                        Comenzar Gratis
                        <ArrowRight className="size-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
