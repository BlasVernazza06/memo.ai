'use client';

import Link from 'next/link';
import { ArrowRight, TriangleAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@repo/ui/components/ui/button';

export default function WorkspaceNotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <div className="relative mb-8">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="p-8 rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 relative z-10"
          >
            <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center">
              <TriangleAlert className="w-10 h-10 text-rose-500" />
            </div>
          </motion.div>
          <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full opacity-30 -z-10 scale-150" />
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3 tracking-tight">
          Workspace no encontrado
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mb-10 leading-relaxed">
          Parece que el espacio de trabajo que buscas ha sido movido,
          eliminado o no tienes permisos para acceder a él.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-14 px-8 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-bold gap-3 shadow-xl shadow-foreground/10 transition-all active:scale-95"
            >
              Volver a Dashboard
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <p className="mt-16 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
          Memo.AI • Error 404
        </p>
      </motion.div>
    </div>
  );
}
