'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Lock } from 'lucide-react';
import { motion } from 'motion/react';

import AuthRightPanel from '@/components/auth/auth-right-panel';
import SignInForm from '@/components/auth/forms/signIn-form';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-6xl bg-card border border-border/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        {/* Left Side: Login Form */}
        <div className="flex-1 p-8 md:p-10 flex flex-col font-sans bg-card">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.webp"
                alt="Memo.ai"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl text-foreground font-bold tracking-tight">
                memo<span className="text-primary">.ai</span>
              </span>
            </Link>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
               className="text-center mb-6"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl mb-4 shadow-lg shadow-primary/30 relative">
                <div className="absolute inset-0 bg-white/10 rounded-2xl animate-pulse" />
                <Lock className="w-6 h-6 text-white relative z-10" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                ¡Accede a tu cuenta!
              </h1>
              <p className="text-muted-foreground mt-2 text-sm font-medium">
                Entra con tu email y contraseña registrada para continuar.
              </p>
            </motion.div>

            <SignInForm />

            <div className="mt-4 text-center pt-2 border-t border-border/60">
              <p className="text-sm text-muted-foreground font-medium">
                ¿No tienes una cuenta?{' '}
                <Link
                  href={`/auth/register${callbackUrl !== '/dashboard' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                  className="text-primary font-bold hover:underline transition-all"
                >
                  Crea una aquí
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Panel */}
        <AuthRightPanel />
      </div>
    </div>
  );
}
