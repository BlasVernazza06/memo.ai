'use client';

import { useState } from 'react';

import { Bell, CreditCard, LogOut, Palette, Shield, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import AppearanceTab from '@/components/dashboard/settings/appearance';
import BillingTab from '@/components/dashboard/settings/billing';
import NotificationsTab from '@/components/dashboard/settings/notifications';
import ProfileTab from '@/components/dashboard/settings/profile';
import SecurityTab from '@/components/dashboard/settings/security';

type TabId =
  | 'profile'
  | 'billing'
  | 'security'
  | 'notifications'
  | 'appearance';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  const sections = [
    { id: 'profile' as TabId, icon: User, label: 'Perfil' },
    { id: 'billing' as TabId, icon: CreditCard, label: 'Suscripción' },
    { id: 'security' as TabId, icon: Shield, label: 'Seguridad' },
    { id: 'notifications' as TabId, icon: Bell, label: 'Notificaciones' },
    { id: 'appearance' as TabId, icon: Palette, label: 'Apariencia' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'billing':
        return <BillingTab />;
      case 'security':
        return <SecurityTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'appearance':
        return <AppearanceTab />;
    }
  };

  return (
    <div className="max-w-5xl min-h-screen mx-auto flex flex-col justify-center py-12 px-6 space-y-12">
      {/* Header Section */}
      <header className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-black tracking-tight text-foreground"
        >
          Configuración
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground font-medium"
        >
          Gestiona tu cuenta, preferencias y suscripción de Memo.ai.
        </motion.p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Navigation Menu */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-64 w-full flex lg:flex-col flex-row gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide shrink-0"
        >
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-5 py-4 rounded-[1.25rem] font-bold text-sm transition-all duration-300 relative shrink-0 ${
                activeTab === item.id
                  ? 'bg-card text-primary shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border'
                  : 'border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon
                className={`w-4 h-4 ${activeTab === item.id ? 'stroke-[2.5px]' : 'stroke-2'}`}
              />
              {item.label}
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-full hidden lg:block"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}

          <div className="lg:mt-4 lg:pt-4 lg:border-t border-border/80 hidden lg:block">
            <button className="group flex items-center gap-3 px-5 py-4 rounded-[1.25rem] font-bold text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all w-full">
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Cerrar Sesión
            </button>
          </div>
        </motion.nav>

        {/* Content Area with Animations */}
        <div className="flex-1 w-full min-h-[750px]">
          <AnimatePresence mode="wait">
            <div key={activeTab}>{renderTabContent()}</div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
