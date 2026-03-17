'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  BrainCircuit,
  HelpCircle,
  Layers,
  LayoutDashboard,
  Loader2,
  LogOut,
  Settings,
} from 'lucide-react';

import { getInitials } from '@/hooks/use-Initials';
import { authClient } from '@/lib/auth-client';
import { useAuth } from '@/lib/auth-provider';


const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Layers, label: 'Flashcards', href: '/dashboard/flashcards' },
  { icon: BrainCircuit, label: 'Quizzes', href: '/dashboard/quizzes' },
  { icon: Settings, label: 'Ajustes', href: '/dashboard/settings' },
];

export default function DashAside() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const blockedPathnames = ['/dashboard/workspaces'];

  for (const blockedPath of blockedPathnames) {
    if (pathname.includes(blockedPath)) {
      return null;
    }
  }

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/');
  };



  const renderAvatar = () => {
    if (isLoading) {
      return (
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (user?.image) {
      return (
        <Image
          src={user.image}
          alt={user?.name ?? 'Usuario'}
          width={40}
          height={40}
          className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm"
        />
      );
    }

    return (
      <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black text-xs border border-primary/20">
        {getInitials(user?.name ?? 'JD')}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Professional Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] h-[calc(100vh-2rem)] my-4 ml-4 rounded-[2.5rem] bg-card/80 backdrop-blur-2xl border border-border/80 sticky top-4 z-40 shrink-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
        {/* Brand Header */}
        <div className="p-8 pb-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-xs border border-transparent dark:border-white/10 flex items-center justify-center">
              <Image
                src={'/logo.webp'}
                width={22}
                height={22}
                alt="Logo Memo.ai"
                className="rounded-md"
              />
            </div>

            <span className="text-xl font-black text-foreground tracking-tight">
              memo
              <span className="text-primary">.ai</span>
            </span>
          </Link>
        </div>

        {/* Main Nav Items */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 pb-3 text-[10px] font-black text-muted-foreground/70 uppercase tracking-[0.2em]">
            Principal
          </p>
          {navItems.map((item, idx) => (
            <Link key={idx} href={item.href} className="block group">
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 font-bold ${
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <item.icon
                  className={`w-4 h-4 ${pathname === item.href ? 'text-primary' : 'text-muted-foreground/70 group-hover:text-foreground/70'}`}
                />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          ))}

          <div className="pt-6 mt-6 border-t border-border/50">
            <p className="px-3 pb-3 text-[10px] font-black text-muted-foreground/70 uppercase tracking-[0.2em]">
              Soporte
            </p>
            <Link href="/dashboard/help" className="block group">
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 font-bold ${
                  pathname === '/dashboard/help'
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <HelpCircle
                  className={`w-4 h-4 ${pathname === '/dashboard/help' ? 'text-primary' : 'text-muted-foreground/70 group-hover:text-foreground/70'}`}
                />
                <span className="text-sm tracking-tight">Ayuda</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-6 pt-0 mt-auto">
          <Link
            href={'/dashboard/profile'}
            className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-muted/40 border border-border/60 shadow-xs hover:bg-muted/80 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              {renderAvatar()}
              <div className="min-w-0">
                <p className="text-xs font-black text-foreground truncate">
                  {user?.name ?? 'JD'}
                </p>
                <p className="text-[10px] font-bold text-muted-foreground truncate uppercase tracking-tight">
                  {user?.plan ? `${user.plan} Plan` : 'Loading...'}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile Glass Bottom Nav */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <nav className="bg-card/85 dark:bg-card/95 backdrop-blur-2xl border border-border shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-3 flex justify-around items-center">
          {navItems.map((item, idx) => (
            <Link key={idx} href={item.href}>
              <div
                className={`p-3.5 rounded-2xl transition-all ${pathname === item.href ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <item.icon className="w-5 h-5" />
              </div>
            </Link>
          ))}
          <Link href="/dashboard/profile" className="p-1 px-3">
            {renderAvatar()}
          </Link>
        </nav>
      </div>
    </>
  );
}
