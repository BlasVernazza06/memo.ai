'use client';

import { useRouter } from 'next/navigation';

import { Camera, Shield, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { authClient } from '@repo/auth/client';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';

import { SidebarUserAvatar } from '@/components/shared/dash-aside/user-avatar';
import AppearanceSection from '@/components/dashboard/settings/appearance';
import SecuritySection from '@/components/dashboard/settings/security';
import { deleteUser } from '@/lib/actions/auth-actions';
import { useAuth } from '@/lib/auth-provider';

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  const handleDeleteProfile = async () => {
    try {
      const result = await deleteUser();

      if (result.success) {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push('/');
            },
          },
        });
      }
    } catch (error) {
      console.error('Error al eliminar perfil:', error);
      toast.error('No se pudo cerrar la sesión tras eliminar el perfil');
    }
  };

  return (
    <div className="space-y-10">
      {/* Primary Card */}
      <div className="bg-card/50 backdrop-blur-xl border border-border/60 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full translate-x-10 -translate-y-10" />

        <div className="relative space-y-12">
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            <div className="relative group self-center md:self-auto">
              <SidebarUserAvatar
                user={user}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-[2.5rem] ring-offset-4 ring-2 ring-primary/20"
              />
              <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-foreground text-background rounded-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all cursor-pointer border-4 border-card">
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
            <Button className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl transition-all hover:-translate-y-0.5 active:translate-y-0">
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <AppearanceSection />

      {/* Security Section (Password Change) */}
      <SecuritySection />

      {/* Danger Zone */}
      <div className="rounded-[2rem] bg-card/30 border border-rose-500/20 overflow-hidden relative transition-all hover:bg-card/40">
        <div className="relative p-6 lg:p-7 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5 flex-1 w-full">
            <div className="w-11 h-11 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 border border-rose-500/5 shadow-sm">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h4 className="text-base font-bold text-foreground">
                  Zona de Peligro
                </h4>
                <span className="hidden sm:inline-block text-[9px] font-black uppercase tracking-[0.2em] text-rose-500/50 bg-rose-500/5 px-2 py-0.5 rounded-full border border-rose-500/10">
                  Acción Irreversible
                </span>
              </div>
              <p className="text-xs text-muted-foreground/70 font-medium max-w-md leading-relaxed">
                Elimina tu cuenta y todos los datos permanentemente. Por favor,
                asegúrate antes de proceder.
              </p>
            </div>
          </div>
          <Button
            onClick={() => handleDeleteProfile()}
            variant="outline"
            className="w-full md:w-auto h-11 px-6 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-95 shrink-0"
          >
            Eliminar cuenta
          </Button>
        </div>
      </div>
    </div>
  );
}
