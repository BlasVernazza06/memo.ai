'use client';

import { Camera, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="bg-card border border-border/80 rounded-4xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
        <h3 className="text-xl font-bold mb-8 text-foreground">
          Información Personal
        </h3>
        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl bg-linear-to-br from-primary to-blue-600 p-1 shadow-2xl shadow-primary/20">
              <div className="w-full h-full rounded-[1.25rem] bg-card flex items-center justify-center overflow-hidden">
                <span className="text-4xl font-black text-primary">
                  BV
                </span>
              </div>
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-foreground text-background rounded-xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 cursor-pointer">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Nombre Completo
                </Label>
                <Input
                  defaultValue="Blas Vernazza"
                  className="rounded-xl border-border bg-muted/30 h-11 focus:ring-primary/10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Email
                </Label>
                <Input
                  defaultValue="blas@memo.ai"
                  disabled
                  className="rounded-xl border-border bg-muted h-11 text-muted-foreground cursor-not-allowed opacity-60"
                />
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl px-8">
              Guardar cambios
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8 border-2 border-dashed border-red-500/20 rounded-4xl flex flex-col md:flex-row justify-between items-center gap-6 bg-red-500/3">
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-red-500 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            ¿Deseas eliminar tu cuenta?
          </h4>
          <p className="text-sm text-muted-foreground font-medium">
            Esta acción es irreversible y borrará todos tus datos.
          </p>
        </div>
        <Button
          variant="ghost"
          className="text-red-500 hover:text-red-600 hover:bg-red-500/10 font-bold px-6 cursor-pointer"
        >
          Eliminar permanentemente
        </Button>
      </div>
    </motion.div>
  );
}
