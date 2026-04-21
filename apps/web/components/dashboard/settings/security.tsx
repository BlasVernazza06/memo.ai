'use client';

import { useState } from 'react';

import { Eye, EyeOff, Lock, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

import { authClient } from '@repo/auth/client';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (response.error) {
        throw new Error(
          response.error.message || 'Error al cambiar la contraseña',
        );
      }

      toast.success('Su contraseña se ha actualizado con exito');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setError(err.message || 'Error al actualizar contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/80 rounded-4xl p-8 space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-2 text-foreground">
            Cambiar Contraseña
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            Asegúrate de usar una contraseña segura y única.
          </p>
        </div>

        <div className="space-y-4 max-w-md">
          {error && (
            <div className="text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground ml-1">
              Contraseña Actual
            </Label>
            <div className="relative">
              <Input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded-xl bg-muted/30 h-11 pl-10 border-border"
              />
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground ml-1">
              Nueva Contraseña
            </Label>
            <div className="relative">
              <Input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-xl bg-muted/30 h-11 pl-10 pr-10 border-border"
              />
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-hidden"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <Button
            onClick={handleUpdatePassword}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl px-8 h-11 w-full md:w-auto cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border/80 rounded-4xl p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center border border-emerald-500/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Doble Factor (2FA)</h4>
              <p className="text-xs text-muted-foreground font-medium">
                Añade una capa extra de seguridad a tu cuenta.
              </p>
            </div>
          </div>
          <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer p-1">
            <div className="w-4 h-4 bg-background rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
