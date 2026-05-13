import FlashcardsList from '@/components/dashboard/flashcards/list/flashcards-list';
import { apiFetch } from '@/lib/api-fetch';

interface FlashcardDeckWithContext {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  workspaceId: string;
  createdAt: string;
  cardsCount: number;
  workspace: {
    id: string;
    name: string;
  };
}

export default async function FlashcardPage() {
  const decks =
    (await apiFetch<FlashcardDeckWithContext[]>('/flashcards', {
      next: { revalidate: 0 },
    }).catch(() => [])) || [];

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto">
      <FlashcardsList initialDecks={decks} />
    </div>
  );
}
