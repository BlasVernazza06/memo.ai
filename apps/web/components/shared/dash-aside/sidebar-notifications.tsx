'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { apiFetchClient } from '@/lib/api-client';

interface NotificationItem {
  id: string;
  title: string;
  message: string; // description from the database
  type: string;
  icon: string | null;
  read: boolean;
  createdAt: string;
}

const TYPE_CTA_CONFIG: Record<
  string,
  { actionText: string; actionHref: string }
> = {
  achievement_unlocked: {
    actionText: 'Ver logros',
    actionHref: '/dashboard/profile',
  },
  quiz_completed: {
    actionText: 'Ver cuestionarios',
    actionHref: '/dashboard/quizzes',
  },
  success: {
    actionText: 'Ver progreso',
    actionHref: '/dashboard/profile',
  },
  info: {
    actionText: 'Comenzar quiz',
    actionHref: '/dashboard/quizzes',
  },
  tip: {
    actionText: 'Ir a flashcards',
    actionHref: '/dashboard/flashcards',
  },
};

const DEFAULT_CTA = {
  actionText: 'Ver detalles',
  actionHref: '/dashboard',
};

export function SidebarNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNotifications = async () => {
    try {
      const res = await apiFetchClient<{ success: boolean; data: NotificationItem[] }>('/notifications');
      if (res && res.success && res.data) {
        // Filter out read notifications
        const unread = res.data.filter((n) => !n.read);
        setNotifications(unread);
      }
    } catch (error) {
      console.error('Error fetching notifications from API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Listen to window custom events to refresh real-time notifications
  useEffect(() => {
    const handleRefetch = () => {
      fetchNotifications();
    };
    window.addEventListener('notification-unlocked', handleRefetch);
    return () => {
      window.removeEventListener('notification-unlocked', handleRefetch);
    };
  }, []);

  // Carousel auto-slide logic
  useEffect(() => {
    if (notifications.length <= 1 || isHovered) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [notifications.length, isHovered]);

  const handleDismiss = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    // Optimistic UI update
    setNotifications((prev) => {
      const nextList = prev.filter((item) => item.id !== id);
      if (activeIndex >= nextList.length) {
        setActiveIndex(Math.max(0, nextList.length - 1));
      }
      return nextList;
    });

    try {
      // Mark as read in the database
      await apiFetchClient(`/notifications/${id}/read`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (isLoading || notifications.length === 0) return null;

  const currentNoti = notifications[activeIndex];
  if (!currentNoti) return null;

  const cta = TYPE_CTA_CONFIG[currentNoti.type] || DEFAULT_CTA;
  const hasMultiple = notifications.length > 1;

  return (
    <div className="px-6 mb-4 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key="container"
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative rounded-2xl bg-zinc-950/[0.85] dark:bg-zinc-900/[0.9] border border-zinc-800 pt-3.5 px-4.5 hover:border-zinc-700/80 transition-all duration-300 overflow-hidden ${
            hasMultiple ? 'pb-7' : 'pb-4'
          }`}
        >
          {/* Subtle indicator bar for auto-rotation */}
          {hasMultiple && (
            <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-800">
              <motion.div
                key={`${currentNoti.id}-${isHovered}`}
                initial={{ width: '0%' }}
                animate={isHovered ? { width: '0%' } : { width: '100%' }}
                transition={isHovered ? { duration: 0 } : { duration: 5, ease: 'linear' }}
                className="h-full bg-primary/60 rounded-r-full"
              />
            </div>
          )}

          {/* Dismiss Button */}
          <button
            onClick={(e) => handleDismiss(currentNoti.id, e)}
            className="absolute top-3.5 right-4 p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all cursor-pointer z-10"
            title="Quitar"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Carousel Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNoti.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-2.5"
            >
              {/* Header: Logo + Title */}
              <div className="flex items-center gap-2 pr-6">
                <div className="bg-white p-1 rounded-lg flex items-center justify-center shadow-xs border border-zinc-800 shrink-0">
                  <Image
                    src="/logo.webp"
                    alt="Logo Memo"
                    width={16}
                    height={16}
                    className="rounded-xs"
                    priority
                  />
                </div>
                <span className="text-xs font-bold text-zinc-100 tracking-tight truncate">
                  {currentNoti.title}
                </span>
              </div>

              {/* Description Body */}
              <p className="text-[11px] text-zinc-400 font-semibold leading-relaxed pr-2 h-9 line-clamp-2 overflow-hidden flex items-start">
                {currentNoti.message}
              </p>

              {/* Footer: Action Link */}
              <div className="pt-0.5">
                <Link
                  href={cta.actionHref}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-200 hover:text-white transition-colors group/link"
                >
                  <span>{cta.actionText}</span>
                  <ChevronRight className="w-3 h-3 text-zinc-400 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel dot indicators absolute to the bottom edge */}
          {hasMultiple && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {notifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'w-4 bg-primary' : 'w-1.5 bg-zinc-800 hover:bg-zinc-700'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
