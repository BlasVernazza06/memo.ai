'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Sparkles, User } from 'lucide-react';
import { motion } from 'motion/react';

import AuthLeftPanel from '@/components/auth/auth-left-panel';
import SignUpForm from '@/components/auth/forms/signUp-form';
import OAuthButtons from '@/components/auth/oauth-buttons';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-6xl bg-card border border-border/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        {/* Visual Panel Left */}
        <AuthLeftPanel />

        {/* Form Side */}
        <div className="flex-1 p-8 md:p-10 flex flex-col bg-card font-sans">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
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
              className="text-center mb-4"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4 relative">
                <User className="w-6 h-6 text-primary" />
                <div className="absolute -top-1 -right-1">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                ¡Crea tu cuenta!
              </h1>
              <p className="text-muted-foreground mt-2 text-sm italic font-medium">
                Comienza hoy mismo tu transformación con IA.
              </p>
            </motion.div>

            <SignUpForm />

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span className="bg-card px-4">O regístrate con</span>
              </div>
            </div>

            <OAuthButtons callbackUrl={callbackUrl} />

            <div className="mt-4 text-center pt-2 border-t border-border/60">
              <p className="text-sm text-muted-foreground font-medium">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  href={`/auth/login${callbackUrl !== '/dashboard' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
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
