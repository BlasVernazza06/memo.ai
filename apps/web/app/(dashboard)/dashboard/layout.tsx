import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import DashAside from '@/components/shared/dash-aside';
import { getSession } from '@/lib/auth-session';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden font-sans selection:bg-primary/20">
      {/* Sidebar Area */}
      <DashAside />

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto h-screen custom-scrollbar">
        {/* Subtle top bar for User Context if needed, or just padding */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 lg:py-16">
          <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </div>
        
        {/* Subtle Decorative Element (just one, very controlled) */}
        <div className="fixed top-0 right-0 w-1/3 h-1/2 bg-linear-to-bl from-primary/5 via-transparent to-transparent pointer-events-none -z-10" />
      </main>
    </div>
  );
}
