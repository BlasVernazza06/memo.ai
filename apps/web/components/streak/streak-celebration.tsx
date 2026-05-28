'use client';

import { useEffect, useState } from 'react';

import { Flame, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@repo/ui/utils';

// Global state or simple custom event emitter to trigger celebration
type StreakCelebrationData = {
  currentStreak: number;
  isNewStreak: boolean;
};

const listeners: ((data: StreakCelebrationData) => void)[] = [];

export function triggerStreakCelebration(data: StreakCelebrationData) {
  listeners.forEach((l) => l(data));
}

export function StreakCelebrationProvider() {
  const [celebrationData, setCelebrationData] =
    useState<StreakCelebrationData | null>(null);
  const [animatedStreak, setAnimatedStreak] = useState(0);

  useEffect(() => {
    const handleTrigger = (data: StreakCelebrationData) => {
      setCelebrationData(data);
      // Animación de incremento de número
      if (data.isNewStreak) {
        setAnimatedStreak(Math.max(0, data.currentStreak - 1));
        setTimeout(() => {
          setAnimatedStreak(data.currentStreak);
        }, 1200);
      } else {
        setAnimatedStreak(data.currentStreak);
      }
    };

    listeners.push(handleTrigger);
  }, []);

  return (
    <AnimatePresence>
      {celebrationData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none"
        >
          {/* Sparkles / Background Light */}
          <div className="absolute inset-0 bg-radial from-orange-500/20 to-transparent pointer-events-none" />

          {/* Celebration Card */}
          <motion.div
            initial={{ scale: 0.8, y: 50, rotate: -2 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 15 }}
            className="bg-zinc-950 border border-orange-500/30 rounded-[2.5rem] w-full max-w-md p-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.15)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setCelebrationData(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Premium Fire Burst Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-orange-500 to-rose-600 rounded-full blur-[80px] opacity-10 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6 py-6">
              {/* Animated Flame */}
              <motion.div
                initial={{ scale: 0.2, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.2, bounce: 0.5 }}
                className="relative"
              >
                {/* Glowing Aura behind flame */}
                <div className="absolute inset-0 bg-orange-500 rounded-full filter blur-xl opacity-40 animate-pulse" />

                <div className="bg-linear-to-br from-orange-500 to-rose-600 p-8 rounded-full shadow-2xl relative z-10 border border-white/20">
                  <Flame className="w-20 h-20 text-white fill-white animate-bounce-slow" />
                </div>

                {/* Sparkling overlays */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-2 -right-2 text-yellow-400"
                >
                  <Sparkles className="w-8 h-8 fill-yellow-400" />
                </motion.div>
              </motion.div>

              {/* Header Text */}
              <div className="space-y-2 mt-4">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-500 tracking-tight"
                >
                  ¡DÍA COMPLETADO!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-zinc-400 text-sm font-medium px-4"
                >
                  Has completado tu estudio de hoy. ¡Mantén encendido el fuego
                  del aprendizaje!
                </motion.p>
              </div>

              {/* Number Animation */}
              <div className="relative py-4 flex items-center justify-center">
                <motion.span
                  key={animatedStreak}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  className="text-8xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                >
                  {animatedStreak}
                </motion.span>
                <span className="text-2xl font-black text-orange-500 ml-2 self-end mb-2 tracking-wide uppercase">
                  Días
                </span>
              </div>

              {/* Encouragement message */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-zinc-300 text-xs font-bold backdrop-blur-sm"
              >
                🔥 Tu constancia es inspiradora. ¡Sigue así!
              </motion.div>

              {/* Continue Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCelebrationData(null)}
                className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-extrabold text-sm py-4 px-8 rounded-2xl shadow-xl shadow-orange-500/20 border border-white/10 hover:shadow-orange-500/35 transition-all duration-300 mt-2 tracking-wider uppercase"
              >
                ¡A Rockear! 🚀
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
