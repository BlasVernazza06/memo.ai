'use client';

import Link from 'next/link';

import { useState } from 'react';

import { Brain, Layers, Plus, Search, Sparkles } from 'lucide-react';

import { DbFlashcard } from '@repo/db';
import { Button } from '@repo/ui/components/ui/button';

import SearchInput from '@/components/shared/search-input';

import { DeckCard } from './deck-card';
import EmptyFlashcardPage from './empty-flashcard-page';

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

export default function FlashcardsList({
  initialDecks,
}: {
  initialDecks: FlashcardDeckWithContext[];
}) {
  const [filteredDecks, setFilteredDecks] =
    useState<FlashcardDeckWithContext[]>(initialDecks);

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Brain className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">
              Mis Estudios
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Flashcards <span className="text-muted-foreground/50">Decks</span>
          </h1>
          <p className="text-muted-foreground">
            Explora y repasa tus colecciones de tarjetas generadas por IA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchInput
            data={initialDecks}
            onResultsChange={setFilteredDecks}
            searchKeys={['name', 'description']}
            placeholder="Buscar mazo..."
            variant="compact"
            className="w-full sm:w-64"
          />
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Mazos Totales',
            value: initialDecks.length,
            icon: Layers,
            color: 'text-blue-500',
          },
          {
            label: 'Tarjetas Listas',
            value: initialDecks.reduce(
              (acc, d) => acc + d.flashcards.length,
              0,
            ),
            icon: Brain,
            color: 'text-purple-500',
          },
          {
            label: 'Promedio Dominio',
            value: '78%',
            icon: Sparkles,
            color: 'text-amber-500',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl bg-background ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                {stat.label}
              </p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid of Decks */}
      {filteredDecks.length === 0 ? (
        <EmptyFlashcardPage hasSearch={initialDecks.length > 0} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecks.map((deck, idx) => (
            <DeckCard key={deck.id} deck={deck} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
