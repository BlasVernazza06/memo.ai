'use client';

import Link from 'next/link';

import { BookOpen, Calendar, ChevronRight, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

import { DbFlashcard } from '@repo/db';
import { Badge } from '@repo/ui/components/ui/badge';

interface FlashcardDeckWithContext {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  workspaceId: string;
  createdAt: string;
  flashcards: DbFlashcard[];
  workspace: {
    id: string;
    name: string;
  };
}

export function DeckCard({
  deck,
  index,
}: {
  deck: FlashcardDeckWithContext;
  index: number;
}) {
  const cardCount = deck.flashcards?.length || 0;

  console.log(deck);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link
        href={`/dashboard/workspaces/${deck.workspaceId}/flashcards/${deck.id}`}
        className="block"
      >
        <div className="relative h-full bg-card hover:bg-card/80 border border-border/50 hover:border-primary/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5">
          {/* Deck Aesthetic Gradient Accent */}
          <div
            className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
            style={{
              background: deck.color || 'var(--color-primary)',
              borderRadius: '100%',
            }}
          />

          <div className="p-6 flex flex-col h-full gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <Badge
                variant="secondary"
                className="bg-secondary/50 border border-gray-300 backdrop-blur-md"
              >
                {cardCount} cards
              </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                {deck.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>En: {deck.name || 'Workspace'}</span>
              </div>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(deck.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 text-primary font-medium text-sm">
                Repasar{' '}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
