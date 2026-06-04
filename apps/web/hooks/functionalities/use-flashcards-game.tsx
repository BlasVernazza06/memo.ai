import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import type { FlashcardDeckWithCards } from '@repo/db';

import { apiFetchClient } from '@/lib/api-client';
import { recordStreakActivity } from '@/lib/record-streak-activity';

export function useFlashcardsGame() {
  const params = useParams();
  const [deck, setDeck] = useState<FlashcardDeckWithCards | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'completed'>(
    'playing',
  );
  const [score, setScore] = useState({ known: 0, unknown: 0 });

  const workspaceId = (params.id as string)?.includes('-')
    ? (params.id as string).split('-').pop()!
    : (params.id as string);

  const deckId = (params.deckId as string)?.includes('-')
    ? (params.deckId as string).split('-').pop()!
    : (params.deckId as string);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await apiFetchClient<FlashcardDeckWithCards>(
          `/flashcards/${deckId}`,
        );
        setDeck(data);
      } catch (error) {
        console.error('Error loading deck:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (deckId) {
      loadData();
    }
  }, [deckId]);

  const cards = deck?.flashcards || [];
  const currentCard = cards[currentIndex];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = (known: boolean) => {
    setScore((prev) => ({
      ...prev,
      known: known ? prev.known + 1 : prev.known,
      unknown: !known ? prev.unknown + 1 : prev.unknown,
    }));

    setIsFlipped(false);

    if (currentIndex < cards.length - 1) {
      // Pequeño delay para que la carta se "resetee" visualmente antes de cambiar el contenido
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 200);
    } else {
      setGameState('completed');
      recordStreakActivity();
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore({ known: 0, unknown: 0 });
    setGameState('playing');
    setIsFlipped(false);
  };

  return {
    deck,
    cards,
    currentCard,
    currentIndex,
    isFlipped,
    gameState,
    score,
    isLoading,
    workspaceId,
    deckId,
    handleFlip,
    handleNext,
    restartGame,
  };
}
