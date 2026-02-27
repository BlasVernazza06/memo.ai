'use client';

import { User } from 'better-auth';
import {
  Bell,
  Brain,
  CheckCircle2,
  Clock,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@repo/ui/components/ui/button';

import { getInitials } from '@/hooks/use-Initials';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useAuth } from '@/lib/auth-provider';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Análisis Listo',
    desc: 'Memo AI terminó de procesar tu PDF de Anatomía.',
    time: 'Hace 5 min',
    type: 'ai',
    icon: Sparkles,
    color: 'text-primary bg-primary/10',
    unread: true,
  },
  {
    id: 2,
    title: 'Repaso Pendiente',
    desc: "Es hora de practicar tus flashcards de 'Bioquímica'.",
    time: 'Hace 2 horas',
    type: 'study',
    icon: Brain,
    color: 'text-purple-500 bg-purple-50',
    unread: true,
  },
  {
    id: 3,
    title: '¡Nueva Racha!',
    desc: 'Has estudiado 5 días seguidos. ¡Sigue así!',
    time: 'Ayer',
    type: 'achievement',
    icon: CheckCircle2,
    color: 'text-emerald-500 bg-emerald-50',
    unread: false,
  },
];

export default function UserMenu({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    menuRef,
    useCallback(() => setIsOpen(false), []),
  );

  const renderUserButton = () => {
    if (!user) {
      return (
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-white/40 shadow-sm p-1.5 pr-4 rounded-4xl">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="w-16 h-3 bg-slate-100 rounded animate-pulse" />
            <div className="w-12 h-2 bg-slate-100 rounded animate-pulse mt-1.5" />
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-white/40 shadow-sm p-1.5 pr-4 rounded-4xl hover:bg-white transition-all cursor-pointer">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-linear-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
            {getInitials(user?.name ?? 'JD')}
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-[12px] font-bold text-slate-800 leading-none">
            {user?.name ?? 'Usuario'}
          </p>
          <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-tight">
            Pro Plan
          </p>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ y: -5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-8 right-8 z-50 hidden lg:flex flex-col items-end gap-4"
      ref={menuRef}
    >
      <div className="flex flex-col items-end gap-4">
        <Link href="/dashboard/profile" className="block outline-hidden">
          {renderUserButton()}
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer group ${
              isOpen
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-95'
                : 'bg-white/70 backdrop-blur-md border border-white/40 text-slate-400 hover:text-primary hover:bg-white shadow-sm'
            }`}
          >
            <motion.div
              animate={
                !isOpen
                  ? {
                      rotate: [0, -10, 10, -10, 10, 0],
                    }
                  : { rotate: 0 }
              }
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 4, // Se agita cada 4 segundos
              }}
              whileHover={{
                rotate: [0, -15, 15, -15, 15, 0],
                transition: { duration: 0.4, repeat: 0 },
              }}
            >
              <Bell className="w-5 h-5" />
            </motion.div>
            {MOCK_NOTIFICATIONS.some((n) => n.unread) && (
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
            )}
          </button>

          {/* Notifications Panel */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute right-0 mt-4 w-80 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden"
              >
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-black text-slate-900 flex items-center gap-2">
                    Notificaciones
                    <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full">
                      3
                    </span>
                  </h3>
                  <button className="text-[11px] font-bold text-primary hover:underline transition-all">
                    Marcar todas
                  </button>
                </div>

                <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                  {MOCK_NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className={`p-5 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 relative ${n.unread ? 'bg-primary/[0.02]' : ''}`}
                    >
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${n.color}`}
                      >
                        <n.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-black text-slate-900">
                            {n.title}
                          </p>
                          <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 italic">
                          &quot;{n.desc}&quot;
                        </p>
                      </div>
                      {n.unread && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 w-1.5 h-1.5 bg-primary rounded-full" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50/50">
                  <Button
                    variant="ghost"
                    className="w-full rounded-2xl text-xs font-black text-slate-400 hover:text-primary transition-all gap-2"
                  >
                    Ver todas las actividades
                    <Clock className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
