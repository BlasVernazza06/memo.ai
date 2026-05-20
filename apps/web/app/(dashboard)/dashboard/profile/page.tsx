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

  const streak = await apiFetch<StreakDTO | null>(`/streaks`, {
    notFoundAsNull: true,
  });

  // TODO: Fetch these real counts from your backend API
  // You could create a single endpoint like /users/me/stats
  const stats = {
    documents: 12,
    flashcards: 124,
    quizzes: 8,
  };

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
          <ProfileAchievements />
        </div>
      </div>
    </div>
  );
}
