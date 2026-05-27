export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';

import { StreakDTO } from '@repo/validators';

import { ProfileAchievements } from '@/components/profile/profile-achievements';
import { ProfileHero } from '@/components/profile/profile-hero';
import { ProfileStats } from '@/components/profile/profile-stats';
import { ProfileStreak } from '@/components/profile/profile-streak';
import { apiFetch } from '@/lib/api-fetch';
import { getSession } from '@/lib/auth-session';

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return redirect('/auth/login');
  }

  // Carga ultra-resiliente de racha con try/catch como fallback ante caídas de red o fallas de base de datos
  let streak = null;
  try {
    streak = await apiFetch<StreakDTO | null>(`/streaks`, {
      notFoundAsNull: true,
    });
  } catch (error) {
    console.error('Error fetching streak data:', error);
  }

  // Carga asíncrona de los logros reales del usuario desde el endpoint NestJS
  let userAchievements = null;
  try {
    const res = await apiFetch<{ success: boolean; data: any[] }>(
      `/achievements`,
      {
        notFoundAsNull: true,
      },
    );
    userAchievements = res?.data || null;
  } catch (error) {
    console.error('Error fetching achievements data:', error);
  }

  let stats = {
    documents: 0,
    flashcards: 0,
    quizzes: 0,
    workspaces: 0,
  };

  try {
    const res = await apiFetch<{
      workspaces: number;
      documents: number;
      flashcards: number;
      quizzes: number;
    }>('/users/me/stats');
    if (res) {
      stats = res;
    }
  } catch (error) {
    console.error('Error fetching stats data:', error);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Client Component Hero */}
      <ProfileHero />

      {/* Integrated Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stats Row - Full Width */}
        <div className="lg:col-span-4 h-full">
          <ProfileStats stats={stats} />
        </div>

        {/* Streak - Full Width */}
        <div className="lg:col-span-4">
          <ProfileStreak user={user} streak={streak} />
        </div>

        {/* Achievements - Full Width */}
        <div className="lg:col-span-4">
          <ProfileAchievements
            stats={stats}
            streak={streak}
            achievements={userAchievements}
          />
        </div>
      </div>
    </div>
  );
}
