import { apiFetch } from '@/lib/api-fetch';
import QuizzesList from '@/components/dashboard/quizzes/quizzes-list';

interface QuizWithContext {
  id: string;
  name: string;
  description: string | null;
  totalQuestions: number;
  workspaceId: string;
  createdAt: string;
  workspace: {
    id: string;
    name: string;
  };
}

export default async function QuizzesPage() {
  const quizzes =
    (await apiFetch<QuizWithContext[]>('/quizzes', {
      next: { revalidate: 0 },
    }).catch(() => [])) || [];

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto">
      <QuizzesList initialQuizzes={quizzes} />
    </div>
  );
}
