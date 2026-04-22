'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { authClient } from '@repo/auth/client';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import {
  type ResetPasswordFormValues,
  resetPasswordSchema,
} from '@repo/validators';

function ResetPasswordFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      setError('Token de recuperación faltante. Por favor, solicita un nuevo enlace.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token: token,
      });

      if (error) {
        setError(
          error.message ||
            'Error al restablecer la contraseña. Es posible que el enlace haya expirado.',
        );
        return;
      }

      setIsSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-2">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            ¡Contraseña actualizada!
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            Tu contraseña ha sido restablecida correctamente. <br />
            Redirigiéndote al inicio de sesión...
          </p>
        </div>
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3 }}
            className="h-full bg-primary"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs font-bold text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-xs font-bold text-muted-foreground/80 ml-1 uppercase tracking-wider"
        >
          Nueva contraseña
        </Label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <Lock className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          </div>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="••••••••"
            className={`bg-muted/30 border-border h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
          />
        </div>
        {errors.password && (
          <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="text-xs font-bold text-muted-foreground/80 ml-1 uppercase tracking-wider"
        >
          Confirmar nueva contraseña
        </Label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <Lock className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          </div>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            placeholder="••••••••"
            className={`bg-muted/30 border-border h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-4 pt-2">
        <Button
          type="submit"
          disabled={isLoading || !token}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-bold text-md shadow-lg shadow-primary/25 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {isLoading ? 'Actualizando...' : 'Restablecer contraseña'}
        </Button>

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancelar y volver
        </Link>
      </div>
    </motion.form>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}
