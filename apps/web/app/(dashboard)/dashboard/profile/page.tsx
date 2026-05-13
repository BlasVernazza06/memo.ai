import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Edit3, Sparkles } from 'lucide-react';

import { DbStreake } from '@repo/db';
import { Button } from '@repo/ui/components/ui/button';

import { ProfileAchievements } from '@/components/profile/profile-achievements';
import { ProfileActivity } from '@/components/profile/profile-activity';
import { ProfileStats } from '@/components/profile/profile-stats';
import { UserAvatar } from '@/components/shared/dash-aside/user-avatar';
import { apiFetch } from '@/lib/api-fetch';
import { getSession } from '@/lib/auth-session';

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return redirect('/auth/login');
  }

  const streak = await apiFetch<DbStreake>(`/streaks`);

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-12">
      {/* Top Profile Section */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* User Identity Card */}
        <div className="w-full lg:w-[320px] bg-card border border-border/50 rounded-[3rem] p-10 shadow-xs flex flex-col items-center text-center relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-primary/5 to-transparent" />

          <div className="relative mt-2">
            <UserAvatar
              user={user}
              className="w-32 h-32 rounded-[2.5rem] border-4 border-background shadow-2xl shadow-primary/10"
            />
          </div>

          <div className="mt-8 space-y-2 relative z-10">
            <h1 className="text-3xl font-black text-foreground tracking-tight">
              {user.name}
            </h1>
            <p className="text-sm text-muted-foreground font-medium opacity-70">
              {user.email}
            </p>
            <div className="pt-4">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-5 py-2 bg-primary/5 rounded-full border border-primary/10">
                PRO MEMBER
              </span>
            </div>
          </div>

          <div className="w-full mt-10">
            <Link href="/dashboard/settings">
              <Button className="w-full bg-foreground hover:bg-foreground/90 text-background font-bold rounded-2xl h-12 shadow-lg transition-all flex gap-2">
                <Edit3 className="w-4 h-4" />
                Editar Perfil
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats & Streak (Duolingo Style) */}
        <ProfileStats user={user} streak={streak} />
      </div>

      {/* Bottom Section: Achievements & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProfileAchievements />
        <ProfileActivity />
      </div>
    </div>
  );
}
