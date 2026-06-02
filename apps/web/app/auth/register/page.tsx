'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

import { Sparkles, User } from 'lucide-react';
import { motion } from 'motion/react';

import AuthLeftPanel from '@/components/auth/auth-left-panel';
import OAuthButtons from '@/components/auth/forms/oauth-buttons';
import SignUpForm from '@/components/auth/forms/signUp-form';

function RegisterContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden select-none">
      {/* Global ambient halos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div
          className="absolute top-[-10%] right-[20%] w-[800px] h-[550px] bg-primary/[0.06] blur-[150px] rounded-full animate-pulse"
          style={{ animationDuration: '9s' }}
        />
        <div
          className="absolute bottom-[-10%] left-[10%] w-[700px] h-[500px] bg-indigo-500/[0.04] blur-[140px] rounded-full animate-pulse"
          style={{ animationDuration: '10s' }}
        />
      </div>

      <div className="w-full max-w-6xl bg-card/65 backdrop-blur-xl border border-border/50 rounded-[2rem] shadow-[0_30px_90px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col md:flex-row min-h-[650px] relative blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br">
        {/* Visual Panel Left */}
        <AuthLeftPanel />

        {/* Form Side */}
        <div className="flex-1 p-8 md:p-12 flex flex-col bg-transparent font-sans">
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
                className="rounded-lg border border-border/50"
              />
            </Link>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/5 border border-primary/15 rounded-2xl mb-4 relative blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br">
                <User className="w-6 h-6 text-primary" />
                <div className="absolute -top-1 -right-1">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-[1.1] mb-2 font-sans">
                Comienza tu <br />
                <span className="text-primary py-1">aprendizaje.</span>
              </h1>
              <p className="text-muted-foreground mt-4 text-xs font-semibold uppercase tracking-wider">
                Comienza hoy mismo tu transformación con IA.
              </p>
            </motion.div>

            <SignUpForm />

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                <span className="bg-card px-4">O regístrate con</span>
              </div>
            </div>

            <OAuthButtons callbackUrl={callbackUrl} />

            <div className="mt-6 text-center pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  href={`/auth/login${callbackUrl !== '/dashboard' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                  className="text-primary font-black hover:underline transition-all lowercase"
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

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center p-4 select-none">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
