'use client';

import { Camera, Shield, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';

export default function Profile() {
  return (
    <div className="space-y-10">
      {/* Primary Card */}
      <div className="bg-card/50 backdrop-blur-xl border border-border/60 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl shadow-black/5 relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full translate-x-10 -translate-y-10" />

        <div className="relative space-y-12">
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            {/* Avatar Section */}
            <div className="relative group self-center md:self-auto">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-[2.5rem] bg-linear-to-br from-primary via-primary/80 to-blue-600 p-1.5 shadow-2xl shadow-primary/20 rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full rounded-[2.2rem] bg-card flex items-center justify-center overflow-hidden">
                  <span className="text-4xl lg:text-5xl font-black text-primary tracking-tighter">
                    BV
                  </span>
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-foreground text-background rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all cursor-pointer border-4 border-card">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-foreground">
                Información del Perfil
              </h3>
              <p className="text-sm text-muted-foreground/80 font-medium">
                Actualiza tu foto y detalles personales para personalizar tu
                cuenta.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/40">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                Nombre Completo
              </Label>
              <Input
                defaultValue="Blas Vernazza"
                className="rounded-2xl border-border/60 bg-muted/20 h-14 px-6 text-sm font-bold focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                Dirección de Email
              </Label>
              <div className="relative group">
                <Input
                  defaultValue="blas@memo.ai"
                  disabled
                  className="rounded-2xl border-border/40 bg-muted h-14 px-6 text-sm font-bold text-muted-foreground/60 cursor-not-allowed opacity-80"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Shield className="w-4 h-4 text-muted-foreground/40" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground/40 font-medium ml-1">
                El email no se puede cambiar por seguridad.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-1 lg:p-1.5 rounded-[2.5rem] bg-linear-to-r from-rose-500/10 via-rose-500/5 to-transparent border border-rose-500/10">
        <div className="bg-card/40 backdrop-blur-sm rounded-[2.2rem] p-8 lg:p-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-black text-rose-500 tracking-tight">
                Zona de Peligro
              </h4>
            </div>
            <p className="text-sm text-muted-foreground font-medium max-w-md">
              Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor,
              esté seguro de esta acción.
            </p>
          </div>
          <Button
            variant="ghost"
            className="h-14 px-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 font-bold text-sm rounded-2xl transition-all active:scale-95"
          >
            Eliminar cuenta permanentemente
          </Button>
        </div>
      </div>
    </div>
  );
}
