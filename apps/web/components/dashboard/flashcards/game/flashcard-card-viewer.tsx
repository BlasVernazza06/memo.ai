'use client';

import { motion } from 'motion/react';
import { HelpCircle, Check } from 'lucide-react';

interface FlashcardCardViewerProps {
  front: string;
  back: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function FlashcardCardViewer({
  front,
  back,
  isFlipped,
  onFlip,
}: FlashcardCardViewerProps) {
  return (
    <div
      className="h-[420px] w-full perspective-1000 group cursor-pointer select-none"
      onClick={onFlip}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        className="w-full h-full relative preserve-3d shadow-xl hover:shadow-2xl hover:shadow-primary/5 transition-shadow rounded-[2.5rem]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden bg-card border border-border rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center z-10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-14 h-14 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight max-w-lg">
            {front}
          </h3>
          <p className="absolute bottom-10 text-muted-foreground/70 font-bold text-xs uppercase tracking-[0.2em] animate-pulse">
            Tocá para ver respuesta
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden bg-foreground text-background rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="w-14 h-14 bg-background/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
            <Check className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="text-xl md:text-2xl font-medium leading-relaxed max-w-lg">
            {back}
          </h3>
          <p className="absolute bottom-10 text-background/20 font-bold text-xs uppercase tracking-[0.2em]">
            Respuesta Correcta
          </p>
        </div>
      </motion.div>
    </div>
  );
}
