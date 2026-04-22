'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import AuthRightPanel from '@/components/auth/auth-right-panel';
import ResetPasswordForm from '@/components/auth/forms/resetPassword-form';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-6xl bg-card border border-border/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        {/* Left Side: Reset Password Form */}
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
              className="text-center mb-10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 relative group/icon overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 scale-0 group-hover/icon:scale-110 transition-transform duration-500" />
                <ShieldCheck className="w-8 h-8 text-primary relative z-10" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center justify-center gap-2">
                Nueva contraseña <Sparkles className="w-6 h-6 text-primary fill-primary" />
              </h1>
              <p className="text-muted-foreground mt-3 text-sm font-medium leading-relaxed font-sans">
                Asegúrate de elegir una contraseña segura <br />
                para proteger tu cuenta de <span className="text-foreground italic">Memo.ai</span>.
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
