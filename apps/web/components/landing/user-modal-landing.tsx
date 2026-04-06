'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useRef } from 'react';

import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from 'lucide-react';
import { motion } from 'motion/react';

import { useClickOutside } from '@/hooks/use-click-outside';
import { authClient } from '@/lib/auth-client';

interface UserModalLandingProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  onClose: () => void;
}

export default function UserModalLanding({
  user,
  onClose,
}: UserModalLandingProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 8, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="absolute top-full right-0 mt-2 w-72 bg-popover backdrop-blur-2xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-border/50 overflow-hidden z-50 p-1.5 pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* User Info Header */}
      <div className="p-4 flex items-center gap-3 border-b border-border/40 mb-1.5">
        <div className="size-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10 overflow-hidden shadow-inner relative">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <User className="size-5 text-primary/70" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground leading-none mb-1">
            {user.name}
          </p>
          <p className="text-[11px] font-medium text-muted-foreground truncate">
            {user.email}
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-0.5">
        <Link href="/dashboard" onClick={onClose} className="block">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-primary/5 transition-all duration-200 group/item">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300 shadow-sm">
                <LayoutDashboard className="size-4" />
              </div>
              <span className="text-sm font-semibold italic text-foreground/90 group-hover/item:text-foreground">
                Dashboard
              </span>
            </div>
            <ChevronRight className="size-3.5 text-muted-foreground/30 group-hover/item:text-muted-foreground/60 transition-all" />
          </div>
        </Link>

        <Link href="/dashboard/settings" onClick={onClose} className="block">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-foreground/5 transition-all duration-200 group/item">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover/item:bg-foreground group-hover/item:text-background transition-all duration-300 shadow-sm">
                <Settings className="size-4" />
              </div>
              <span className="text-sm font-semibold italic text-foreground/90 group-hover/item:text-foreground">
                Ajustes
              </span>
            </div>
            <ChevronRight className="size-3.5 text-muted-foreground/30 group-hover/item:text-muted-foreground/60 transition-all" />
          </div>
        </Link>

        <div className="h-px bg-border/40 my-1 mx-2" />

        <button
          onClick={async () => {
            await authClient.signOut();
            onClose();
            router.push('/');
          }}
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-destructive/10 transition-all duration-200 group/item cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive group-hover/item:bg-destructive group-hover/item:text-destructive-foreground transition-all duration-300 shadow-sm">
              <LogOut className="size-4" />
            </div>
            <span className="text-sm font-semibold italic text-destructive group-hover/item:text-destructive">
              Cerrar Sesión
            </span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
