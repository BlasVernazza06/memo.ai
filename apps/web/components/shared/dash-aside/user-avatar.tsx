'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { cn } from '@repo/ui/utils';

import { AuthUser } from '@/lib/auth-provider';

interface UserAvatarProps {
  user: AuthUser | null | undefined;
  isLoading?: boolean;
  className?: string;
}

export function UserAvatar({ user, isLoading, className }: UserAvatarProps) {
  if (isLoading) {
    return (
      <Skeleton className={cn('w-9 h-9 rounded-xl animate-pulse', className)} />
    );
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  return (
    <Avatar
      className={cn(
        'w-9 h-9 rounded-xl border border-white/10 shadow-sm transition-all',
        className,
      )}
    >
      <AvatarImage
        src={user?.image || undefined}
        alt={user?.name || 'Usuario'}
        className="object-cover"
        referrerPolicy="no-referrer"
      />
      <AvatarFallback
        className={cn(
          'bg-primary/10 text-primary font-black text-xs italic',
          className?.includes('w-') && 'text-2xl lg:text-4xl',
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

// Para compatibilidad con el resto del código
export { UserAvatar as SidebarUserAvatar };
