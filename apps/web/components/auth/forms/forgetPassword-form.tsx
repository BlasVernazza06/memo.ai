'use client';

import Link from 'next/link';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { authClient } from '@repo/auth/client';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import {
  type ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '@repo/validators';

export default function ForgetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setError(error.message || 'Error al enviar el correo de recuperación.');
        return;
      }

      setIsSuccess(true);
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
            ¡Correo enviado!
          </h2>
          <p className="text-muted-foreground text-sm">
            Hemos enviado un enlace de recuperación a tu bandeja de entrada. Por
            favor, revisa tu correo electrónico.
          </p>
        </div>
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-xl font-bold text-md shadow-lg shadow-primary/25 transition-all"
        >
          <Link href="/auth/login">Volver al inicio de sesión</Link>
        </Button>
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
          htmlFor="email"
          className="text-xs font-bold text-muted-foreground/80 ml-1 uppercase tracking-wider"
        >
          Email de la cuenta
        </Label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <Mail className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          </div>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="ej. blas@memo.ai"
            className={`bg-muted/30 border-border h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
          />
        </div>
        {errors.email && (
          <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-bold text-md shadow-lg shadow-primary/25 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </Button>

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a iniciar sesión
        </Link>
      </div>
    </motion.form>
  );
}
