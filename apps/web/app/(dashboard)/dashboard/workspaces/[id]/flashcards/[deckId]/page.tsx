'use client';

// React
// External packages
// Next
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useState } from 'react';

import {
  ArrowRight,
  Check,
  ChevronLeft,
  HelpCircle,
  RotateCcw,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

// Components
import { Button } from '@repo/ui/components/ui/button';

export default function FlashcardGamePage() {
  const params = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'completed'>(
    'playing',
  );
  const [score, setScore] = useState({ known: 0, unknown: 0 });

  const workspaceId = params.id as string;

  // Mock data based on deckId logic could be here
  const cards = [
    {
      id: 1,
      question: '¿Cuál es el hueso más largo del cuerpo humano?',
      answer: 'El fémur.',
    },
    {
      id: 2,
      question: '¿Cuántas vértebras cervicales tiene el ser humano?',
      answer: 'Siete vértebras.',
    },
    { id: 3, question: '¿Qué hueso protege el cerebro?', answer: 'El cráneo.' },
    {
      id: 4,
      question: '¿Dónde se encuentra el hueso hioides?',
      answer: 'En el cuello, debajo de la lengua (no articula con otro hueso).',
    },
    {
      id: 5,
      question: '¿Cuál es la función principal de la caja torácica?',
      answer: 'Proteger el corazón y los pulmones.',
    },
  ];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = (known: boolean) => {
    setScore((prev) => ({
      ...prev,
      known: known ? prev.known + 1 : prev.known,
      unknown: !known ? prev.unknown + 1 : prev.unknown,
    }));

    setIsFlipped(false);

    if (currentIndex < cards.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      setGameState('completed');
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore({ known: 0, unknown: 0 });
    setGameState('playing');
    setIsFlipped(false);
  };

  if (gameState === 'completed') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center max-w-2xl mx-auto space-y-8 text-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="w-24 h-24 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center mb-4 mx-auto shadow-xl shadow-yellow-500/10"
        >
          <Trophy className="w-12 h-12" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-foreground">
            ¡Sesión Completada!
          </h1>
          <p className="text-muted-foreground font-medium text-lg">
            Has repasado {cards.length} tarjetas.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full px-4 md:px-0">
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl space-y-1">
            <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
              {score.known}
            </p>
            <p className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-500 tracking-widest">
              Dominadas
            </p>
          </div>
          <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-3xl space-y-1">
            <p className="text-4xl font-black text-orange-600 dark:text-orange-400">
              {score.unknown}
            </p>
            <p className="text-xs font-bold uppercase text-orange-600 dark:text-orange-500 tracking-widest">
              A repasar
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full pt-6 px-4 md:px-0">
          <Button
            onClick={restartGame}
            variant="outline"
            className="flex-1 h-14 rounded-2xl border-border text-muted-foreground font-bold hover:bg-muted hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Repetir Mazo
          </Button>
          <Link
            href={`/dashboard/workspaces/${workspaceId}`}
            className="flex-1 w-full block"
          >
            <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 transition-all active:scale-95">
              Volver al Workspace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10 pt-4 px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/workspaces/${workspaceId}`}
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm"
        >
          <div className="w-8 h-8 rounded-full bg-muted group-hover:bg-muted/80 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <span>Salir</span>
        </Link>
        <div className="flex items-center gap-3 bg-card border border-border rounded-full pl-4 pr-1 py-1 shadow-sm">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Progreso
          </span>
          <div className="bg-muted px-3 py-1 rounded-full text-xs font-black text-foreground">
            {currentIndex + 1} / {cards.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden w-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          className="h-full bg-primary transition-all duration-500 ease-out"
        />
      </div>

      {/* Flashcard Area */}
      <div
        className="h-[420px] w-full perspective-1000 group cursor-pointer select-none"
        onClick={handleFlip}
      >
        <motion.div
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
          className="w-full h-full relative preserve-3d shadow-xl hover:shadow-2xl hover:shadow-primary/5 transition-shadow rounded-[2.5rem]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 backface-hidden bg-card border border-border rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center z-10"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-14 h-14 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <HelpCircle className="w-7 h-7" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight max-w-lg">
              {currentCard?.question}
            </h3>
            <p className="absolute bottom-10 text-muted-foreground/70 font-bold text-xs uppercase tracking-[0.2em] animate-pulse">
              Tocá para ver respuesta
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 backface-hidden bg-foreground text-background rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="w-14 h-14 bg-background/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
              <Check className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-medium leading-relaxed max-w-lg">
              {currentCard?.answer}
            </h3>
            <p className="absolute bottom-10 text-background/20 font-bold text-xs uppercase tracking-[0.2em]">
              Respuesta Correcta
            </p>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 items-center gap-4 max-w-md mx-auto pt-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-2"
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleNext(false);
            }}
            className="w-16 h-16 rounded-3xl bg-card border-2 border-orange-500/20 text-orange-500 hover:bg-orange-500 hover:text-primary-foreground hover:border-orange-500 shadow-lg shadow-orange-500/10 transition-all duration-300 flex items-center justify-center p-0"
          >
            <X className="w-8 h-8" />
          </Button>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">
            Difícil
          </span>
        </motion.div>

        <div className="flex justify-center -mt-8 relative z-10">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleFlip();
              }}
              className="w-24 h-24 rounded-4xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-600/30 flex items-center justify-center p-0 border-4 border-background"
            >
              <div className="flex flex-col items-center gap-1">
                {isFlipped ? (
                  <ArrowRight className="w-8 h-8 animate-in slide-in-from-left-2 fade-in duration-300" />
                ) : (
                  <Zap className="w-8 h-8" />
                )}
                <span className="text-[9px] uppercase font-black tracking-widest opacity-80 leading-none">
                  {isFlipped ? 'Siguiente' : 'Voltear'}
                </span>
              </div>
            </Button>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-2"
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleNext(true);
            }}
            className="w-16 h-16 rounded-3xl bg-card border-2 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-primary-foreground hover:border-emerald-500 shadow-lg shadow-emerald-500/10 transition-all duration-300 flex items-center justify-center p-0"
          >
            <Check className="w-8 h-8" />
          </Button>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">
            Fácil
          </span>
        </motion.div>
      </div>
    </div>
  );
}
