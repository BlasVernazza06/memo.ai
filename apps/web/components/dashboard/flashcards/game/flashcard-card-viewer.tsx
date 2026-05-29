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
      className="h-[400px] w-full perspective-1000 group cursor-pointer select-none relative"
      onClick={onFlip}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.65,
          type: 'spring',
          stiffness: 140,
          damping: 18,
        }}
        className="w-full h-full relative preserve-3d shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] border border-border/10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front - Question side */}
        <div
          className="absolute inset-0 backface-hidden bg-linear-to-br from-card to-muted/30 border-2 border-border/60 rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center z-10 transition-all duration-300 group-hover:border-primary/30"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Abstract aesthetic accents */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-all duration-500" />
          
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-[1.25rem] flex items-center justify-center mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/20">
            <HelpCircle className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight tracking-tight max-w-lg select-text">
            {front}
          </h3>
          <p className="absolute bottom-10 text-[10px] text-muted-foreground/60 font-black uppercase tracking-[0.25em] bg-muted/65 border border-border/60 px-4 py-2 rounded-full backdrop-blur-sm shadow-xs transition-colors group-hover:bg-card">
            💡 Haz click para voltear
          </p>
        </div>

        {/* Back - Answer side */}
        <div
          className="absolute inset-0 backface-hidden bg-zinc-950 text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center border-2 border-zinc-800"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Abstract flame aura */}
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 bg-emerald-500/10 rounded-[1.25rem] flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_8px_30px_rgba(16,185,129,0.1)]">
            <Check className="w-8 h-8 text-emerald-400 stroke-[3]" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold leading-relaxed max-w-lg select-text text-zinc-100">
            {back}
          </h3>
          <p className="absolute bottom-10 text-[10px] text-emerald-400/70 font-black uppercase tracking-[0.25em] bg-emerald-950/40 border border-emerald-500/20 px-4 py-2 rounded-full backdrop-blur-sm shadow-xs">
            Respuesta Correcta
          </p>
        </div>
      </motion.div>
    </div>
  );
}
