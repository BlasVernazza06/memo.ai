import { Edit3, Share2, Sparkles } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@repo/ui/components/ui/button';

import { ProfileAchievements } from '@/components/profile/profile-achievements';
import { ProfileActivity } from '@/components/profile/profile-activity';
import { ProfileStats } from '@/components/profile/profile-stats';
import { getInitials } from '@/hooks/use-Initials';
import { getSession } from '@/lib/auth-session';

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return redirect('/auth/login');
  }

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      {/* Top Profile Section */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* User Card */}
        <div className="lg:w-1/3 bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-br from-primary/10 to-blue-500/5" />

          <div className="relative mt-4">
            <div className="w-32 h-32 rounded-3xl bg-linear-to-br from-primary to-blue-600 p-1.5 shadow-2xl shadow-primary/20">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={128}
                  height={128}
                  className="w-full h-full rounded-[1.25rem] object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-[1.25rem] bg-white flex items-center justify-center">
                  <span className="text-5xl font-black text-primary italic">
                    {getInitials(user.name)}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl border-4 border-white shadow-lg">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {user.name}
            </h1>
            <p className="text-xs text-slate-400 font-medium">{user.email}</p>
            <p className="text-sm font-bold text-primary/80 uppercase tracking-widest px-4 py-1.5 bg-primary/5 rounded-full inline-block mt-2">
              Pro Member
            </p>
          </div>

          <div className="w-full flex items-center justify-center gap-3 mt-8">
            <Link href="/dashboard/settings">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl h-12 shadow-lg shadow-primary/20 flex gap-2">
                <Edit3 className="w-4 h-4" />
                Editar
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats & Weekly Progress */}
        <ProfileStats />
      </div>

      {/* Bottom Section: Achievements & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileAchievements />
        <ProfileActivity />
      </div>
    </div>
  );
}
