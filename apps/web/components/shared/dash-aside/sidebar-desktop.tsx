'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HelpCircle, LogOut, Search } from 'lucide-react';

import { NavItemConfig, SidebarNavItem } from './nav-item';
import { SidebarUserAvatar } from './user-avatar';

interface SidebarDesktopProps {
  navItems: NavItemConfig[];
  user: any;
  isLoading: boolean;
  onSignOut: () => void;
}

export function SidebarDesktop({
  navItems,
  user,
  isLoading,
  onSignOut,
}: SidebarDesktopProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[280px] h-[calc(100vh-2rem)] my-4 ml-4 rounded-[3rem] memo-glass sticky top-4 z-40 shrink-0 shadow-[0_8px_40px_rgba(0,0,0,0.02)] border border-border/40">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 ">
          <div className="bg-white dark:bg-foreground p-1.5 rounded-xl shadow-xs border border-transparent flex items-center justify-center">
            <Image
              src={'/logo.webp'}
              width={22}
              height={22}
              alt="Logo Memo.ai"
              className="rounded-md"
            />
          </div>
          <span className="text-xl font-black text-foreground tracking-tighter italic">
            memo<span className="text-primary not-italic">.ai</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="px-4 pb-3 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.25em]">
          Menú Principal
        </p>
        {navItems.map((item, idx) => (
          <SidebarNavItem
            key={idx}
            item={item}
            isActive={pathname === item.href}
          />
        ))}

        <div className="pt-8 mt-6 border-t border-border/40">
          <p className="px-4 pb-3 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.25em]">
            Asistencia
          </p>
          <SidebarNavItem
            item={{ icon: HelpCircle, label: 'Ayuda', href: '/dashboard/help' }}
            isActive={pathname === '/dashboard/help'}
          />
        </div>
      </nav>

      <div className="p-6 pt-0 mt-auto">
        <div className="flex items-center justify-between gap-3 p-3.5 rounded-3xl bg-secondary/30 border border-border/40 hover:bg-secondary/50 transition-all duration-300 group/profile">
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 min-w-0"
          >
            <SidebarUserAvatar user={user} isLoading={isLoading} />
            <div className="min-w-0">
              <p className="text-xs font-black text-foreground truncate italic group-hover/profile:text-primary transition-colors">
                {user?.name ?? 'JD'}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground truncate uppercase tracking-widest opacity-60">
                {user?.plan ? `${user.plan} Plan` : 'Plan Pro'}
              </p>
            </div>
          </Link>
          <button
            onClick={onSignOut}
            className="p-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all cursor-pointer active:scale-90"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
