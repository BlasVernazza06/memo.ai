'use client';

import { Brain } from 'lucide-react';
import { motion } from 'motion/react';

export default function WorkspaceLoading() {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-8 max-w-[240px] w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-12 h-12 text-primary/40"
        >
          <Brain className="w-full h-full" />
        </motion.div>
        <div className="space-y-4 w-full text-center">
          <div className="h-px w-full bg-border/50 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary/40"
              initial={{ left: '-100%', width: '50%' }}
              animate={{ left: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] pl-1">
            Cargando
          </p>
        </div>
      </div>
    </div>
  );
}
