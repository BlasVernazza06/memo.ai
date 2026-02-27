'use client';

import {
  ArrowRight,
  Brain,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import Link from 'next/link';

interface Flashcard {
  question: string;
  answer: string;
}

const SAMPLE_FLASHCARDS: Flashcard[] = [
  {
    question: '¿Qué es la Mitocondria?',
    answer:
      'Es el orgánulo celular encargado de suministrar la mayor parte de la energía necesaria para la actividad celular (ATP).',
  },
  {
    question: '¿Cuál es la función del ADN?',
    answer:
      'Contiene las instrucciones genéticas usadas en el desarrollo y funcionamiento de todos los organismos vivos.',
  },
  {
    question: '¿Qué es la Homeostasis?',
    answer:
      'Es la tendencia a la estabilidad de un sistema biológico mediante mecanismos de autorregulación.',
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

  useEffect(() => {
    if (!isOpen) {
      // Reset when closing
      setStep('input');
      setProgress(0);
    }
  }, [isOpen]);

  const handleGenerate = () => {
    setStep('processing');

    // Simulate progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setStep('results'), 500);
      }
      setProgress(p);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-1020 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Cómo funciona Memo.ai</h3>
                <p className="text-xs text-muted-foreground">
                  Demostración de generación automática
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="p-8">
            {step === 'input' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Ejemplo de apuntes:
                    </label>
                    <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                      Modo Demo
                    </span>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/10 pointer-events-none" />
                    <div className="w-full h-44 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-sm leading-relaxed text-slate-600 font-medium italic overflow-hidden">
                      &ldquo;{inputText}&rdquo;
                      <div className="mt-4 h-4 w-3/4 bg-slate-200/50 rounded-full animate-pulse" />
                      <div className="mt-2 h-4 w-1/2 bg-slate-200/50 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <p className="text-center text-xs text-muted-foreground italic">
                    Subiendo tus propios documentos obtendrás resultados
                    personalizados.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  className="w-full h-14 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/20"
                >
                  <span>Ver Magia de la IA</span>
                  <Brain className="size-5" />
                </motion.button>
              </motion.div>
            )}

            {step === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <div className="size-24 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="size-8 text-primary animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h4 className="text-xl font-bold">
                    Procesando tus apuntes...
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Nuestra IA está extrayendo los conceptos clave.
                  </p>
                </div>

                <div className="w-full max-w-sm h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {step === 'results' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle2 className="size-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">
                      ¡Éxito! 3 Flashcards generadas
                    </span>
                  </div>
                  <button
                    onClick={() => setStep('input')}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="size-3" /> Reintentar
                  </button>
                </div>

                <div className="space-y-3">
                  {SAMPLE_FLASHCARDS.map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 group"
                    >
                      <p className="text-xs font-bold text-primary mb-1">
                        PREGUNTA {i + 1}
                      </p>
                      <p className="text-sm font-bold text-slate-900 mb-2">
                        {card.question}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {card.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="bg-primary/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-primary/10">
                    <div className="text-center sm:text-left">
                      <p className="text-sm font-bold text-slate-900">
                        ¿Quieres ver el resto?
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Regístrate para generar hasta 50 flashcards por
                        documento.
                      </p>
                    </div>
                    <Link href="/auth/register" className="w-full sm:w-auto">
                      <button className="w-full bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                        Crea tu cuenta gratis
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
