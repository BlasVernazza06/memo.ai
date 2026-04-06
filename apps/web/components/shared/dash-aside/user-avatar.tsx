'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Skeleton } from '@repo/ui/components/ui/skeleton';

interface SidebarUserAvatarProps {
  user: any;
  isLoading: boolean;
}

export function SidebarUserAvatar({ user, isLoading }: SidebarUserAvatarProps) {
  if (isLoading) {
    return <Skeleton className="w-9 h-9 rounded-xl animate-pulse" />;
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'JD';

  return (
    <Avatar className="w-9 h-9 rounded-xl border border-white/10 shadow-sm ring-2 ring-white/5 group-hover/profile:ring-primary/20 transition-all">
      <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
      <AvatarFallback className="bg-primary/10 text-primary font-black text-[10px] italic">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
