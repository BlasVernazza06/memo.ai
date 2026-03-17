'use client';

import { Mail, Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Notifications() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="bg-card border border-border/80 rounded-4xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
        <h3 className="text-xl font-bold mb-6 text-foreground">
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
              className="flex items-center justify-between py-4 border-b border-border last:border-0 group"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <notif.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {notif.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium">
                    {notif.desc}
                  </p>
                </div>
              </div>
              <div
                className={`w-12 h-6 rounded-full relative cursor-pointer p-1 transition-colors ${notif.active ? 'bg-primary' : 'bg-muted'}`}
              >
                <div
                  className={`w-4 h-4 bg-background rounded-full shadow-sm transition-transform ${notif.active ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
