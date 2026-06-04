'use client';

import { useEffect, useState, useRef } from 'react';
import { Award, Brain, Lightbulb, X, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'tip';
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'noti-1',
    title: '¡Estudio diario completo!',
    description: 'Completaste tu meta de flashcards para hoy. ¡Sigue así!',
    type: 'success',
  },
  {
    id: 'noti-2',
    title: 'Nuevo quiz disponible',
    description: 'Generamos un nuevo test para tu Workspace de Programación.',
    type: 'info',
  },
  {
    id: 'noti-3',
    title: 'Sugerencia de la IA',
    description: 'Repasar antes de dormir incrementa la retención a largo plazo.',
    type: 'tip',
  },
];

const TYPE_CONFIG: Record<
  NotificationItem['type'],
  {
    icon: LucideIcon;
    bgClass: string;
    iconClass: string;
    borderClass: string;
  }
> = {
  success: {
    icon: Award,
    bgClass: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-500/20 dark:border-emerald-500/30',
  },
  info: {
    icon: Brain,
    bgClass: 'bg-primary/10 dark:bg-primary/15',
    iconClass: 'text-primary dark:text-primary-foreground',
    borderClass: 'border-primary/20 dark:border-primary/30',
  },
  tip: {
    icon: Lightbulb,
    bgClass: 'bg-amber-500/10 dark:bg-amber-500/15',
    iconClass: 'text-amber-600 dark:text-amber-400',
    borderClass: 'border-amber-500/20 dark:border-amber-500/30',
  },
};

export function SidebarNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
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

  const handleDismiss = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    setNotifications((prev) => {
      const nextList = prev.filter((item) => item.id !== id);
      // Reset active index if out of bounds
      if (activeIndex >= nextList.length) {
        setActiveIndex(Math.max(0, nextList.length - 1));
      }
      return nextList;
    });
  };

  if (notifications.length === 0) return null;

  const currentNoti = notifications[activeIndex];
  if (!currentNoti) return null;

  const config = TYPE_CONFIG[currentNoti.type];
  const IconComponent = config.icon;

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
          className="relative rounded-2xl bg-primary/[0.04] dark:bg-primary/[0.08] backdrop-blur-md border border-primary/10 dark:border-primary/20 p-4 shadow-[0_4px_24px_rgba(var(--primary),0.02)] hover:shadow-[0_8px_32px_rgba(var(--primary),0.06)] hover:border-primary/20 dark:hover:border-primary/30 transition-all duration-300 overflow-hidden"
        >
          {/* Subtle indicator bar for auto-rotation */}
          {notifications.length > 1 && (
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/10">
              <motion.div
                key={`${currentNoti.id}-${isHovered}`}
                initial={{ width: '0%' }}
                animate={isHovered ? { width: '0%' } : { width: '100%' }}
                transition={isHovered ? { duration: 0 } : { duration: 5, ease: 'linear' }}
                className="h-full bg-primary/40 rounded-r-full"
              />
            </div>
          )}

          {/* Dismiss Button */}
          <button
            onClick={(e) => handleDismiss(currentNoti.id, e)}
            className="absolute top-3 right-3 p-1 rounded-lg text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted/50 transition-all cursor-pointer"
            title="Quitar notificación"
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
              className="flex gap-3"
            >
              {/* Notification Icon */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${config.bgClass} ${config.borderClass} ${config.iconClass}`}
              >
                <IconComponent className="w-4.5 h-4.5" />
              </div>

              {/* Text info */}
              <div className="flex-1 pr-4 min-w-0">
                <h4 className="text-xs font-black text-foreground mb-1 leading-tight tracking-tight">
                  {currentNoti.title}
                </h4>
                <p className="text-[10px] text-muted-foreground leading-normal font-semibold">
                  {currentNoti.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel dots indicators */}
          {notifications.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-3 pt-1 border-t border-primary/5">
              {notifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'w-4 bg-primary' : 'w-1.5 bg-primary/20 hover:bg-primary/40'
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
