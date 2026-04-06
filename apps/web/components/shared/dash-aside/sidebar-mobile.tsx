'use client';

import { motion } from 'motion/react';
import { SidebarNavItem } from './nav-item';
import { SidebarUserAvatar } from './user-avatar';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

interface SidebarMobileProps {
  navItems: any[];
  user: any;
  isLoading: boolean;
  onSignOut: () => void;
}

export function SidebarMobile({
  navItems,
  user,
  isLoading,
  onSignOut,
}: SidebarMobileProps) {
  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm">
      <motion.nav 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/85 dark:bg-card/95 backdrop-blur-2xl border border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-3 flex justify-around items-center"
      >
        {navItems.map((item, idx) => (
          <SidebarNavItem 
            key={idx} 
            item={item} 
            isActive={false} // This would need the actual pathname check
            variant="mobile" 
          />
        ))}
        
        <div className="w-px h-8 bg-border/40 mx-1" />
        
        <Link href="/dashboard/profile" className="relative group">
          <SidebarUserAvatar user={user} isLoading={isLoading} />
        </Link>
        
        <button
          onClick={onSignOut}
          className="p-3 text-muted-foreground hover:text-destructive transition-colors ml-1"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </motion.nav>
    </div>
  );
}
