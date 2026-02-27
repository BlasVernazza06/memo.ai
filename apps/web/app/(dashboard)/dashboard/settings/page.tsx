'use client';

import {
  Bell,
  Camera,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Eye,
  Globe,
  Laptop,
  Lock,
  LogOut,
  Mail,
  Monitor,
  Moon,
  Palette,
  Shield,
  Smartphone,
  Sparkles,
  Sun,
  Trash2,
  User,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';

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
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-8">Información Personal</h3>
              <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl bg-linear-to-br from-primary to-blue-600 p-1 shadow-2xl shadow-primary/20">
                    <div className="w-full h-full rounded-[1.25rem] bg-white flex items-center justify-center overflow-hidden">
                      <span className="text-4xl font-black text-primary">
                        BV
                      </span>
                    </div>
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 space-y-6 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                        Nombre Completo
                      </Label>
                      <Input
                        defaultValue="Blas Vernazza"
                        className="rounded-xl border-slate-200 bg-slate-50/50 h-11 focus:ring-primary/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                        Email
                      </Label>
                      <Input
                        defaultValue="blas@memo.ai"
                        disabled
                        className="rounded-xl border-slate-200 bg-slate-100 h-11 text-slate-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-8">
                    Guardar cambios
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-8 border-2 border-dashed border-red-100 rounded-4xl flex flex-col md:flex-row justify-between items-center gap-6 bg-red-50/10">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-red-500 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  ¿Deseas eliminar tu cuenta?
                </h4>
                <p className="text-sm text-slate-400 font-medium">
                  Esta acción es irreversible y borrará todos tus datos.
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-red-400 hover:text-red-500 hover:bg-red-50 font-bold px-6"
              >
                Eliminar permanentemente
              </Button>
            </div>
          </motion.div>
        );
      case 'billing':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="relative overflow-hidden bg-slate-900 rounded-4xl p-8 text-white shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-primary/20 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                    <Sparkles className="w-3 h-3" />
                    Plan Actual: PRO
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold italic tracking-tight text-primary">
                      Memo Unlimited
                    </h3>
                    <p className="text-slate-400 text-sm font-medium">
                      Próximo cobro: $9.99 el 12 de Marzo, 2026
                    </p>
                  </div>
                </div>
                <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl px-6 h-12 shadow-lg transition-all active:scale-95">
                  Gestionar Facturación
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'PDFs', value: 'Ilimitados', icon: CheckCircle2 },
                { label: 'Espacio', value: '100 GB', icon: CheckCircle2 },
                { label: 'IA', value: 'Turbo', icon: CheckCircle2 },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'security':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Cambiar Contraseña</h3>
                <p className="text-sm text-slate-400 font-medium">
                  Asegúrate de usar una contraseña segura y única.
                </p>
              </div>

              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 ml-1">
                    Contraseña Actual
                  </Label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="rounded-xl bg-slate-50/50 h-11 pl-10"
                    />
                    <Lock className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 ml-1">
                    Nueva Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="rounded-xl bg-slate-50/50 h-11 pl-10"
                    />
                    <Lock className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <Button className="bg-primary font-bold rounded-xl px-8 h-11 w-full md:w-auto">
                  Actualizar Contraseña
                </Button>
              </div>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Doble Factor (2FA)</h4>
                    <p className="text-xs text-slate-400 font-medium">
                      Añade una capa extra de seguridad a tu cuenta.
                    </p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer p-1">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6">
                Canales de Notificación
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Nuevas funcionalidades',
                    desc: 'Recibe actualizaciones sobre las últimas mejoras de la IA.',
                    icon: Sparkles,
                    active: true,
                  },
                  {
                    title: 'Newsletter semanal',
                    desc: 'Un resumen de tus avances y estadísticas de estudio.',
                    icon: Mail,
                    active: false,
                  },
                  {
                    title: 'Alertas de seguridad',
                    desc: 'Avisos sobre inicios de sesión desconocidos.',
                    icon: Shield,
                    active: true,
                  },
                ].map((notif, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 group"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <notif.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {notif.title}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">
                          {notif.desc}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-12 h-6 rounded-full relative cursor-pointer p-1 transition-colors ${notif.active ? 'bg-primary' : 'bg-slate-200'}`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notif.active ? 'translate-x-6' : 'translate-x-0'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'appearance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-8">Personalización visual</h3>

              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Tema del Sistema
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Claro', icon: Sun, active: true },
                      {
                        id: 'dark',
                        label: 'Oscuro',
                        icon: Moon,
                        active: false,
                      },
                      {
                        id: 'system',
                        label: 'Sistema',
                        icon: Laptop,
                        active: false,
                      },
                    ].map((theme) => (
                      <div
                        key={theme.id}
                        className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center gap-3 transition-all ${
                          theme.active
                            ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10'
                            : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                        }`}
                      >
                        <theme.icon
                          className={`w-6 h-6 ${theme.active ? 'text-primary' : 'text-slate-400'}`}
                        />
                        <span
                          className={`text-sm font-bold ${theme.active ? 'text-primary' : 'text-slate-500'}`}
                        >
                          {theme.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-50 pt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Animaciones reducidas
                      </h4>
                      <p className="text-xs text-slate-400 font-medium">
                        Suaviza las transiciones si prefieres menos movimiento.
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer p-1">
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-12">
      {/* Header Section */}
      <header className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-black tracking-tight text-slate-900"
        >
          Configuración
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 font-medium"
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
              className={`flex items-center gap-3 px-5 py-4 rounded-[1.25rem] font-bold text-sm transition-all duration-300 relative ${
                activeTab === item.id
                  ? 'bg-white text-primary shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
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

          <div className="lg:mt-4 lg:pt-4 lg:border-t border-slate-100 hidden lg:block">
            <button className="group flex items-center gap-3 px-5 py-4 rounded-[1.25rem] font-bold text-sm text-red-400 hover:text-red-500 hover:bg-red-50 transition-all w-full">
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Cerrar Sesión
            </button>
          </div>
        </motion.nav>

        {/* Content Area with Animations */}
        <div className="flex-1 w-full min-h-[500px]">
          <AnimatePresence mode="wait">
            <div key={activeTab}>{renderTabContent()}</div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
