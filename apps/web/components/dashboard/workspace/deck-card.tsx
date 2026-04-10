'use client';

import Link from 'next/link';

import { Brain, Layers, Settings } from 'lucide-react';
import { motion } from 'motion/react';

import type { FlashcardDeckWithCards } from '@repo/db';
import { Button } from '@repo/ui/components/ui/button';

interface DeckCardProps {
  deck: FlashcardDeckWithCards;
  index: number;
}

export function DeckCard({ deck, index }: DeckCardProps) {
  const cardCount = deck.flashcards?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-card border border-border/60 rounded-3xl p-6 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
          <Layers className="w-6 h-6" />
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
          {cardCount} Cartas
        </div>
      </div>

      <div className="space-y-1 mb-6">
        <h4 className="font-black text-lg text-foreground group-hover:text-primary transition-colors">
          {deck.name}
        </h4>
        <p className="text-xs text-muted-foreground/60 font-medium line-clamp-1">
          {deck.description || 'Mazo de estudio optimizado'}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/dashboard/workspaces/${deck.workspaceId}/flashcards/${deck.id}`}
          className="flex w-full items-center justify-center bg-primary text-primary-foreground font-black rounded-xl h-10 gap-2 shadow-lg shadow-primary/20"
        >
          <Brain className="w-4 h-4" />
          Estudiar
        </Link>
        <Button
          variant="outline"
          className="w-10 h-10 p-0 rounded-xl border-border/60 hover:bg-muted"
        >
          <Settings className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </motion.div>
  );
}
