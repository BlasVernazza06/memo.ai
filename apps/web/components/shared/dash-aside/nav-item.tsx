'use client';

import Link from 'next/link';
import { cn } from '@repo/ui/utils';

export interface NavItemConfig {
  icon: any;
  label: string;
  href: string;
}

export function SidebarNavItem({ 
  item, 
  isActive, 
  variant = 'desktop' 
}: { 
  item: NavItemConfig, 
  isActive: boolean, 
  variant?: 'desktop' | 'mobile' 
}) {
  if (variant === 'mobile') {
    return (
      <Link href={item.href} className="relative group">
        <div
          className={cn(
            "p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center",
            isActive
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
          )}
        >
          <item.icon className="w-5 h-5" />
        </div>
        {isActive && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
        )}
      </Link>
    );
  }

  return (
    <Link href={item.href} className="block group">
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold relative overflow-hidden",
          isActive
            ? "bg-primary/10 text-primary shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
        )}
        <item.icon
          className={cn(
            "w-4 h-4 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-foreground/70"
          )}
        />
        <span className="text-sm tracking-tight">{item.label}</span>
      </div>
    </Link>
  );
}
