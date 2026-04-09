'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { type RegisterFormValues, registerSchema } from '@repo/validators';

import { authClient } from '@/lib/auth-client';

export default function SignUpForm() {
  const { data: session } = authClient.useSession();
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  if (session) {
    router.replace(callbackUrl);
    return null;
  }

  const onSubmit = async (formData: RegisterFormValues) => {
    setIsLoadingForm(true);
    setGeneralError(null);

    try {
      const { error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (error) {
        setGeneralError(
          error.message || 'Error al crear la cuenta. Inténtalo de nuevo.',
        );
        return;
      }

      router.push(callbackUrl);
    } catch (err) {
      console.error(err);
      setGeneralError('Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setIsLoadingForm(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {generalError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-xs font-bold text-center mb-2"
        >
          {generalError}
        </motion.div>
      )}
      <div className="space-y-1">
        <Label
          htmlFor="name"
          className="text-xs font-bold text-muted-foreground/80 ml-1 uppercase tracking-wider"
        >
          Nombre Completo
        </Label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <User className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          </div>
          <Input
            id="name"
            type="text"
            {...register('name')}
            placeholder="Tu nombre"
            className={`bg-muted/30 border-border h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
          />
        </div>
        {errors.name && (
          <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="email"
          className="text-xs font-bold text-muted-foreground/80 ml-1 uppercase tracking-wider"
        >
          Email
        </Label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <Mail className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          </div>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="tu@email.com"
            className={`bg-muted/30 border-border h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
          />
        </div>
        {errors.email && (
          <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="password"
          className="text-xs font-bold text-muted-foreground/80 ml-1 uppercase tracking-wider"
        >
          Contraseña
        </Label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <Lock className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          </div>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Mínimo 8 caracteres"
            className={`bg-muted/30 border-border h-12 rounded-xl pl-11 pr-10 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center"
          >
            {showPassword ? (
              <Eye className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            ) : (
              <EyeOff className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="password"
          className="text-xs font-bold text-muted-foreground/80 ml-1 uppercase tracking-wider"
        >
          Confirmar Contraseña
        </Label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <Lock className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          </div>
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            placeholder="Mínimo 8 caracteres"
            className={`bg-muted/30 border-border h-12 rounded-xl pl-11 pr-10 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center"
          >
            {showPassword ? (
              <Eye className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            ) : (
              <EyeOff className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-xl font-bold text-md shadow-lg shadow-primary/25 transition-all active:scale-[0.98] mt-0.5"
      >
        {isLoadingForm ? 'Creando Cuenta...' : 'Crear Cuenta Gratuita'}
      </Button>
    </motion.form>
  );
}
