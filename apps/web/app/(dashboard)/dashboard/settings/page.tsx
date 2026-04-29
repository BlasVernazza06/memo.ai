'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { Bell, CreditCard, LogOut, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { authClient } from '@repo/auth/client';

import BillingTab from '@/components/dashboard/settings/billing';
import NotificationsTab from '@/components/dashboard/settings/notifications';
import ProfileTab from '@/components/dashboard/settings/profile';

type TabId = 'profile' | 'subscription' | 'notifications';

const tabs: {
  id: TabId;
  icon: React.ElementType;
  label: string;
  description: string;
}[] = [
  {
    id: 'profile',
    icon: User,
    label: 'Perfil',
    description: 'Foto, nombre y datos personales',
  },
  {
    id: 'subscription',
    icon: CreditCard,
    label: 'Suscripción',
    description: 'Plan actual y facturación',
  },
  {
    id: 'notifications',
    icon: Bell,
    label: 'Notificaciones',
    description: 'Alertas y preferencias',
  },
];

function TabContent({ activeTab }: { activeTab: TabId }) {
  switch (activeTab) {
    case 'profile':
      return <ProfileTab />;
    case 'subscription':
      return <BillingTab />;
    case 'notifications':
      return <NotificationsTab />;
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const router = useRouter();

  const activeSection = tabs.find((t) => t.id === activeTab)!;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/');
  };

  return (
    <div className="max-w-6xl h-[calc(100vh-4rem)] mx-auto flex flex-col py-8 px-6 overflow-hidden">
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="mb-8 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Breadcrumb */}
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
            Dashboard / Configuración
          </p>
          <h1 className="text-3xl font-black tracking-tight text-foreground leading-none">
            Configuración
          </h1>
        </motion.div>

        {/* Accent separator */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          className="mt-5 h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent"
        />
      </header>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start overflow-hidden h-full">
        {/* ── Sidebar nav ─────────────────────────────────────── */}
        <motion.nav
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="lg:w-60 w-full flex lg:flex-col flex-row gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide shrink-0"
        >
          {/* Mobile label */}
          <p className="lg:hidden text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-1 shrink-0 self-center mr-2">
            Sección
          </p>

          {tabs.map((item, i) => {
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
                onClick={() => setActiveTab(item.id)}
                className={`
                  group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold text-sm
                  transition-all duration-200 shrink-0 text-left w-full overflow-hidden
                  ${
                    isActive
                      ? 'bg-card text-foreground border border-border/80 shadow-sm'
                      : 'border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }
                `}
              >
                {/* Active pill indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute left-0 inset-y-0 w-[3px] bg-primary rounded-r-full hidden lg:block"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon container */}
                <span
                  className={`
                    w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200
                    ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted/60 text-muted-foreground group-hover:bg-muted group-hover:text-foreground'
                    }
                  `}
                >
                  <item.icon
                    className="w-3.5 h-3.5"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </span>

                {/* Text */}
                <span className="hidden lg:flex flex-col gap-0.5">
                  <span className="text-sm font-bold leading-none">
                    {item.label}
                  </span>
                  <span
                    className={`text-[10px] font-medium leading-none transition-colors ${isActive ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}
                  >
                    {item.description}
                  </span>
                </span>
                <span className="lg:hidden text-sm font-bold">
                  {item.label}
                </span>
              </motion.button>
            );
          })}

          {/* Sign out — only desktop */}
          <div className="hidden lg:block mt-auto pt-4 border-t border-border/50">
            <button
              onClick={(e) => {
                (e.preventDefault(), handleSignOut());
              }}
              className="group flex items-center gap-3 px-4 py-3 rounded-2xl w-full text-sm font-semibold text-muted-foreground/70 hover:text-red-500 hover:bg-red-500/5 transition-all duration-200"
            >
              <span className="w-8 h-8 rounded-xl bg-muted/60 flex items-center justify-center shrink-0 group-hover:bg-red-500/10 transition-colors">
                <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="leading-none">Cerrar sesión</span>
                <span className="text-[10px] leading-none text-muted-foreground/40 group-hover:text-red-400/60">
                  Salir de tu cuenta
                </span>
              </span>
            </button>
          </div>
        </motion.nav>

        {/* ── Content area ────────────────────────────────────── */}
        <div className="flex-1 w-full h-full overflow-hidden flex flex-col min-w-0">
          {/* Content header strip */}
          <motion.div
            key={activeTab + '-header'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mb-6 shrink-0 flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground/70">
              {activeSection.label}
            </span>
            <span className="text-xs text-muted-foreground/40 font-medium hidden sm:block">
              — {activeSection.description}
            </span>
          </motion.div>

          {/* Scrollable tab content */}
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide pb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="w-full"
              >
                <TabContent activeTab={activeTab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
