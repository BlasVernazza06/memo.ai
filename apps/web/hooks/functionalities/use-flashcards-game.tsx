import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { toast } from 'sonner';

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

      // Completar sesión de flashcards en el backend para registrar el intento y evaluar logros
      apiFetchClient<{ success: boolean; newlyUnlocked: any[] }>(
        `/flashcards/${deckId}/complete`,
        {
          method: 'POST',
          body: JSON.stringify({ cardsCount: cards.length }),
        },
      )
        .then((res) => {
          if (res?.newlyUnlocked && res.newlyUnlocked.length > 0) {
            res.newlyUnlocked.forEach((achievement) => {
              toast.custom((t) => (
                <div className="relative rounded-2xl bg-zinc-950/95 border border-zinc-800 p-4.5 shadow-[0_4px_30px_rgba(0,0,0,0.15)] w-80 text-left flex flex-col gap-2.5 overflow-hidden">
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="absolute top-3.5 right-4 p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all cursor-pointer z-10"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded-lg flex items-center justify-center border border-zinc-800 shrink-0 shadow-xs">
                      <Image
                        src="/logo.webp"
                        alt="Logo Memo"
                        width={16}
                        height={16}
                        className="rounded-xs"
                      />
                    </div>
                    <span className="text-xs font-bold text-zinc-100 tracking-tight">
                      ¡Logro Desbloqueado!
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-semibold leading-relaxed pr-6">
                    Has conseguido la insignia &ldquo;{achievement.title}&rdquo;. ¡Felicidades! {achievement.icon || '🏆'}
                  </p>
                </div>
              ), { duration: 6000 });
            });
            window.dispatchEvent(new CustomEvent('notification-unlocked'));
          }
        })
        .catch((err) => {
          console.error('Error completing flashcards deck on backend:', err);
        });
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
