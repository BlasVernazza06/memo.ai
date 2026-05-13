'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  X, 
  Check, 
  Zap, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';

import { useFlashcardsGame } from '@/hooks/functionalities/use-flashcards-game';
import FlashcardCardViewer from './flashcard-card-viewer';
import FlashcardGameResults from './flashcard-game-results';

export default function FlashcardGameContainer() {
  const {
    cards,
    currentCard,
    currentIndex,
    isFlipped,
    gameState,
    score,
    isLoading,
    workspaceId,
    handleFlip,
    handleNext,
    restartGame,
  } = useFlashcardsGame();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 animate-pulse">
        <div className="w-20 h-20 bg-muted rounded-full" />
        <div className="h-6 w-48 bg-muted rounded-lg" />
        <div className="h-4 w-32 bg-muted rounded-lg" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
          <Zap className="w-10 h-10 opacity-20" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Sin tarjetas disponibles</h2>
          <p className="text-muted-foreground">
            Este mazo no tiene flashcards o no se pudo cargar.
          </p>
        </div>
        <Link href={`/dashboard/workspaces/${workspaceId}`}>
          <Button variant="outline">Volver</Button>
        </Link>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <FlashcardGameResults
        score={score}
        totalCards={cards.length}
        workspaceId={workspaceId}
        onRestart={restartGame}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 md:py-20">
      <div className="max-w-3xl mx-auto w-full space-y-10 px-4 md:px-0">
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

        {/* Card Viewer */}
        <FlashcardCardViewer
          front={currentCard?.front || ''}
          back={currentCard?.back || ''}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />

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
    </div>
  );
}
