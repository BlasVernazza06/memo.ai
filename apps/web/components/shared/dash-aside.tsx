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
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';

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
          className="w-10 h-10 rounded-xl object-cover ring-2  shadow-sm"
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
        <div className="p-8 pb-6">
          <Link href="/" className="flex items-center gap-3 group/logo">
            <div className="bg-white p-1.5 rounded-xl shadow-xs border border-transparent dark:border-white/10 flex items-center justify-center group-hover/logo:scale-110 transition-transform duration-500">
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
              <span className="text-primary group-hover/logo:opacity-80 transition-opacity">
                .ai
              </span>
            </span>
          </Link>
        </div>

        {/* Quick Action Button */}
        <div className="px-6 mb-4">
          <Link href="/dashboard/workspaces/new" className="block">
            <button className="w-full bg-primary text-primary-foreground h-11 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group/btn">
              <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-500" />
              <span>Nuevo Workspace</span>
            </button>
          </Link>
        </div>

        {/* Main Nav Items */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 pb-3 text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">
            Principal
          </p>
          {navItems.map((item, idx) => (
            <Link key={idx} href={item.href} className="block group">
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 font-bold relative overflow-hidden ${
                  pathname === item.href
                    ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary),0.1)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:translate-x-1'
                }`}
              >
                {pathname === item.href && (
                  <motion.div
                    layoutId="active-nav-glow"
                    className="absolute left-0 w-1 h-4 bg-primary rounded-full z-20"
                  />
                )}
                <item.icon
                  className={`w-4 h-4 z-10 transition-transform duration-500 group-hover:scale-110 ${pathname === item.href ? 'text-primary' : 'text-muted-foreground/70 group-hover:text-foreground/70'}`}
                />
                <span className="text-sm z-10">{item.label}</span>
              </div>
            </Link>
          ))}

          <div className="pt-6 mt-6 border-t border-border/20">
            <p className="px-3 pb-3 text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">
              Soporte
            </p>
            <Link href="/dashboard/help" className="block group">
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 font-bold relative overflow-hidden ${
                  pathname === '/dashboard/help'
                    ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary),0.1)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:translate-x-1'
                }`}
              >
                {pathname === '/dashboard/help' && (
                  <motion.div
                    layoutId="active-nav-glow"
                    className="absolute left-0 w-1 h-4 bg-primary rounded-full"
                  />
                )}
                <HelpCircle
                  className={`w-4 h-4 z-10 transition-transform duration-500 group-hover:rotate-12 ${pathname === '/dashboard/help' ? 'text-primary' : 'text-muted-foreground/70 group-hover:text-foreground/70'}`}
                />
                <span className="text-sm tracking-tight z-10">Ayuda</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-6 pt-0 mt-auto">
          <div className="flex items-center justify-between gap-1 rounded-2xl bg-muted/10 dark:bg-muted/5 backdrop-blur-sm border border-border/40 shadow-xs overflow-hidden">
            <Link
              href={'/dashboard/profile'}
              className="flex items-center gap-3 p-3 flex-1 hover:bg-muted/40 transition-all duration-300 group/info min-w-0"
            >
              <div className="relative">
                {renderAvatar()}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-foreground truncate group-hover/info:text-primary transition-colors">
                  {user?.name ?? 'JD'}
                </p>
                <p className="text-[10px] font-bold text-muted-foreground truncate uppercase tracking-tight opacity-70">
                  {user?.plan ? `${user.plan} Plan` : 'Loading...'}
                </p>
              </div>
            </Link>
            <div className="pr-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSignOut();
                }}
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/15 rounded-xl transition-all cursor-pointer group/logout"
              >
                <LogOut className="w-4 h-4 group-hover/logout:-translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Version Badge */}
          <div className="mt-4 flex justify-center">
            <span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-[0.3em]">
              Memo AI v1.0.4
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Glass Bottom Nav */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <nav className="bg-card/85 dark:bg-card/95 backdrop-blur-2xl border border-border shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-3 flex justify-around items-center">
          {navItems.map((item, idx) => (
            <Link key={idx} href={item.href}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`p-3.5 rounded-2xl transition-all relative ${pathname === item.href ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {pathname === item.href && (
                  <motion.div
                    layoutId="mobile-nav-glow"
                    className="absolute inset-0 bg-primary rounded-2xl -z-10 blur-md opacity-20"
                  />
                )}
                <item.icon className="w-5 h-5" />
              </motion.div>
            </Link>
          ))}
          <Link href="/dashboard/profile" className="p-1 px-3">
            <motion.div whileTap={{ scale: 0.9 }}>{renderAvatar()}</motion.div>
          </Link>
        </nav>
      </div>
    </>
  );
}
