'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Rocket,
  Sparkles,
  Trophy,
  User,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { type RegisterFormValues, registerSchema } from '@repo/validators';

import { authClient } from '@/lib/auth-client';

import OAuthButtons from '../../../components/auth/oauth-buttons';

export default function RegisterPage() {
  const { data: session, isPending: isLoading } = authClient.useSession();
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (session) {
    redirect('/');
  }

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: RegisterFormValues) => {
    setIsLoadingForm(true);

    try {
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        {/* Visual Panel Left */}
        <div className="hidden md:flex w-[45%] bg-[#F5F8FF] p-12 flex-col justify-between relative overflow-hidden font-sans">
          <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">
              Potencia tu <span className="text-primary">Aprendizaje</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium">
              Únete a miles de estudiantes que ya están hackeando su
              productividad.
            </p>
          </div>

          <div className="relative flex items-center justify-center h-full">
            {/* Central Visual */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="w-48 h-48 bg-white rounded-4xl shadow-2xl flex items-center justify-center border border-primary/5">
                <Rocket className="w-20 h-20 text-primary animate-bounce-slow" />
              </div>

              {/* Stats Chips */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-6 -right-12 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-50"
              >
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold font-mono">10x Speed</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-4 -left-12 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-50"
              >
                <Trophy className="w-4 h-4 text-primary fill-primary/10" />
                <span className="text-xs font-bold">12 Day Streak</span>
              </motion.div>
            </motion.div>

            {/* Orbit rings */}
            <div className="absolute w-[320px] h-[320px] border border-primary/5 rounded-full" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
              <div className="flex -space-x-2 justify-center mb-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"
                  />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                  +5k
                </div>
              </div>
              <p className="text-[11px] text-[#64748B] text-center font-bold uppercase tracking-wider">
                Únete a la comunidad de estudio más avanzada
              </p>
            </div>

            <div className="flex gap-1.5 justify-center mt-4">
              <div className="w-2 h-1 bg-primary/20 rounded-full" />
              <div className="w-6 h-1 bg-primary rounded-full" />
              <div className="w-2 h-1 bg-primary/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-1 p-8 md:p-16 flex flex-col bg-white font-sans">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="flex items-center gap-2 group justify-end"
            >
              <span className="text-xl font-bold tracking-tight">
                memo<span className="text-primary">.ai</span>
              </span>
              <Image
                src="/logo.webp"
                alt="Memo.ai"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </Link>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4 relative">
                <User className="w-6 h-6 text-primary" />
                <div className="absolute -top-1 -right-1">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1C1E]">
                ¡Crea tu cuenta!
              </h1>
              <p className="text-muted-foreground mt-2 text-sm italic font-medium">
                Comienza hoy mismo tu transformación con IA.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit, (errors) =>
                console.log('Errores de validación:', errors),
              )}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-xs font-bold text-[#4A4C4E] ml-1 uppercase tracking-wider"
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
                    className={`bg-[#FAFBFC] border-[#E2E8F0] h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-bold text-[#4A4C4E] ml-1 uppercase tracking-wider"
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
                    className={`bg-[#FAFBFC] border-[#E2E8F0] h-12 rounded-xl pl-11 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold text-[#4A4C4E] ml-1 uppercase tracking-wider"
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
                    className={`bg-[#FAFBFC] border-[#E2E8F0] h-12 rounded-xl pl-11 pr-10 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
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

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold text-[#4A4C4E] ml-1 uppercase tracking-wider"
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
                    className={`bg-[#FAFBFC] border-[#E2E8F0] h-12 rounded-xl pl-11 pr-10 focus:ring-primary/10 focus:border-primary transition-all text-sm ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}`}
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
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-bold text-md shadow-lg shadow-primary/25 transition-all active:scale-[0.98] mt-2"
              >
                {isLoadingForm ? 'Creando Cuenta...' : 'Crear Cuenta Gratuita'}
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#E2E8F0]" />
                </div>
                <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="bg-white px-4">O regístrate con</span>
                </div>
              </div>

              <OAuthButtons />
            </motion.form>

            <div className="mt-8 text-center pt-4 border-t border-[#F1F5F9]">
              <p className="text-sm text-muted-foreground font-medium">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  href="/auth/login"
                  className="text-primary font-bold hover:underline transition-all"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
