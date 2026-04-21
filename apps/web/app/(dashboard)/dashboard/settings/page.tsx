'use client';

import { useState } from 'react';

import { Bell, CreditCard, LogOut, Palette, Shield, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import AppearanceTab from '@/components/dashboard/settings/appearance';
import BillingTab from '@/components/dashboard/settings/billing';
import NotificationsTab from '@/components/dashboard/settings/notifications';
import ProfileTab from '@/components/dashboard/settings/profile';
import SecurityTab from '@/components/dashboard/settings/security';

type TabId = 'profile' | 'subscription' | 'notifications';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  const sections = [
    { id: 'profile' as TabId, icon: User, label: 'Perfil' },
    { id: 'subscription' as TabId, icon: CreditCard, label: 'Suscripción' },
    { id: 'notifications' as TabId, icon: Bell, label: 'Notificaciones' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'subscription':
        return <BillingTab />;
      case 'notifications':
        return <NotificationsTab />;
    }
  };

  return (
    <div className="max-w-6xl h-[calc(100vh-4rem)] mx-auto flex flex-col py-8 px-6 overflow-hidden">
      {/* Header Section */}
      <header className="space-y-2 mb-10 shrink-0">
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

      <div className="flex flex-col lg:flex-row gap-10 items-start overflow-hidden h-full">
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
                  ? 'bg-card text-primary border border-border'
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

        {/* Content Area with Animations and Internal Scroll */}
        <div className="flex-1 w-full h-full overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide pb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
