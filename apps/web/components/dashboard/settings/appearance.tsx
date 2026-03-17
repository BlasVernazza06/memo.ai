'use client';

import { Laptop, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

import { useTheme } from '@repo/ui/components/theme-provider';
import { Label } from '@repo/ui/components/ui/label';

export default function Appearance() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="bg-card border border-border/80 rounded-4xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
        <h3 className="text-xl font-bold mb-8 text-foreground">
          Personalización visual
        </h3>

        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Tema del Sistema
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'light', label: 'Claro', icon: Sun },
                { id: 'dark', label: 'Oscuro', icon: Moon },
                { id: 'system', label: 'Sistema', icon: Laptop },
              ].map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center gap-3 transition-all ${
                    theme === t.id
                      ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10'
                      : 'border-border hover:border-primary/40 bg-muted/20'
                  }`}
                >
                  <t.icon
                    className={`w-6 h-6 ${theme === t.id ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                  <span
                    className={`text-sm font-bold ${theme === t.id ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-border pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-foreground">
                  Animaciones reducidas
                </h4>
                <p className="text-xs text-muted-foreground font-medium">
                  Suaviza las transiciones si prefieres menos movimiento.
                </p>
              </div>
              <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer p-1">
                <div className="w-4 h-4 bg-background rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
