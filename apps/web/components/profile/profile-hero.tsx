'use client';

import Link from 'next/link';
import { Edit3, Settings, Share2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';
import { UserAvatar } from '@/components/shared/dash-aside/user-avatar';
import { useAuth } from '@/lib/auth-provider';
import { Skeleton } from '@repo/ui/components/ui/skeleton';

export function ProfileHero() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <section className="relative rounded-[2.5rem] overflow-hidden bg-card border border-border/50 shadow-sm">
        <div className="relative z-10 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center gap-8">
          <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-11 w-32 rounded-xl" />
              <Skeleton className="h-11 w-11 rounded-xl" />
              <Skeleton className="h-11 w-11 rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!user) return null;

  return (
    <section className="relative rounded-[2.5rem] overflow-hidden bg-card border border-border/50 shadow-sm">
      <div className="relative z-10 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center md:items-center gap-8">
        {/* Avatar */}
        <div className="relative">
          <UserAvatar
            user={user}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background shadow-xl relative z-10"
          />
          <div className="absolute -bottom-1 -right-1 bg-foreground text-background p-1.5 rounded-full shadow-lg z-20 border-2 border-background">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                {user.name}
              </h1>
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
                {user.plan} Member
              </span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground font-medium opacity-70">
              {user.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <Link href="/dashboard/settings">
              <Button className="bg-foreground hover:bg-foreground/90 text-background px-6 h-11 rounded-xl font-bold text-sm shadow-md transition-all flex gap-2">
                <Edit3 className="w-5 h-5" />
                Editar Perfil
              </Button>
            </Link>
            <Button
              variant="outline"
              className="h-12 w-12 rounded-xl border border-border hover:bg-muted transition-all"
            >
              <Share2 className="w-7 h-7" />
            </Button>
            <Button
              variant="outline"
              className="h-12 w-12 rounded-xl border border-border hover:bg-muted transition-all"
            >
              <Settings className="w-7 h-7" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
