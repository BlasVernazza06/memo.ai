'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import AuthRightPanel from '@/components/auth/auth-right-panel';
import ResetPasswordForm from '@/components/auth/forms/resetPassword-form';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden select-none">
      {/* Global ambient halos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div
          className="absolute top-[-10%] left-[20%] w-[800px] h-[550px] bg-primary/[0.06] blur-[150px] rounded-full animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-[-10%] right-[10%] w-[700px] h-[500px] bg-indigo-500/[0.04] blur-[140px] rounded-full animate-pulse"
          style={{ animationDuration: '11s' }}
        />
      </div>

      <div className="w-full max-w-6xl bg-card/65 backdrop-blur-xl border border-border/50 rounded-[2rem] shadow-[0_30px_90px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col md:flex-row min-h-[650px] relative blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br">
        {/* Left Side: Reset Password Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col font-sans bg-transparent">
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
                className="rounded-lg border border-border/50"
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
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/5 border border-primary/15 rounded-2xl mb-6 relative group/icon overflow-hidden blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br">
                <div className="absolute inset-0 bg-primary/10 scale-0 group-hover/icon:scale-110 transition-transform duration-500" />
                <ShieldCheck className="w-8 h-8 text-primary relative z-10 animate-pulse" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-[1.1] mb-2 font-sans">
                Restablecer <br />
                <span className="text-primary py-1">contraseña.</span>
              </h1>
              <p className="text-muted-foreground mt-4 text-xs font-semibold leading-relaxed uppercase tracking-wider font-sans">
                Asegúrate de elegir una contraseña segura <br />
                para proteger tu cuenta de{' '}
                <span className="text-foreground italic lowercase">
                  Memo.ai
                </span>
                .
              </p>
            </motion.div>

            <ResetPasswordForm />
          </div>
        </div>

        {/* Right Side: Visual Panel */}
        <AuthRightPanel />
      </div>
    </div>
  );
}
