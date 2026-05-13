'use client';

import { motion } from 'motion/react';
import { Trophy, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@repo/ui/components/ui/button';

interface FlashcardGameResultsProps {
  score: { known: number; unknown: number };
  totalCards: number;
  workspaceId: string;
  onRestart: () => void;
}

export default function FlashcardGameResults({
  score,
  totalCards,
  workspaceId,
  onRestart,
}: FlashcardGameResultsProps) {
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
          Has repasado {totalCards} tarjetas.
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
          onClick={onRestart}
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
