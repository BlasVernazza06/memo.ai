import { useEffect, useState } from 'react';

import { Rocket, Sparkles, Trophy, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';

const slides = [
  {
    title: (
      <>
        Potencia tu <span className="text-primary">Aprendizaje</span>
      </>
    ),
    description:
      'Únete a miles de estudiantes que ya están hackeando su productividad.',
    boxTitle: 'Únete a la comunidad de estudio más avanzada',
    showAvatars: true,
  },
  {
    title: (
      <>
        Enfócate en <span className="text-primary">lo Importante</span>
      </>
    ),
    description:
      'Nuestra IA resume y organiza tus PDFs y videos automáticamente.',
    boxTitle: 'Ahorra más de 10 horas semanales de lectura',
    showAvatars: false,
    icon: Zap,
  },
  {
    title: (
      <>
        Tu ritmo, <span className="text-primary">tu Camino</span>
      </>
    ),
    description: 'Flashcards generadas por IA personalizadas para tu memoria.',
    boxTitle: '98% de éxito en exámenes con repetición espaciada',
    showAvatars: false,
    icon: Trophy,
  },
];

export default function AuthLeftPanel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[current]!;

  return (
    <div className="hidden md:flex w-[45%] bg-blue-50/50 dark:bg-blue-950/20 p-8 flex-col justify-between relative overflow-hidden font-sans border-r border-border/40">
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl" />

      <motion.div
        key={`header-${current}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center space-y-3"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          {currentSlide.title}
        </h2>
        <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium">
          {currentSlide.description}
        </p>
      </motion.div>

      <div className="relative flex items-center justify-center h-full">
        {/* Central Visual */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`visual-${current}`}
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotate: 5 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-48 h-48 bg-card rounded-4xl shadow-2xl flex items-center justify-center border border-border/50">
              {current === 0 ? (
                <Rocket className="w-20 h-20 text-primary animate-bounce-slow" />
              ) : (
                (() => {
                  const Icon = currentSlide.icon;
                  return Icon ? (
                    <Icon className="w-20 h-20 text-primary" />
                  ) : (
                    <Zap className="w-20 h-20 text-primary" />
                  );
                })()
              )}
            </div>

            {/* Stats Chips */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-6 -right-12 bg-card p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-border/50"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold font-mono">10x Speed</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-4 -left-12 bg-card p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-border/50"
            >
              <Trophy className="w-4 h-4 text-primary fill-primary/10" />
              <span className="text-xs font-bold">12 Day Streak</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Orbit rings */}
        <div className="absolute w-[320px] h-[320px] border border-primary/10 rounded-full" />
      </div>

      <div className="relative z-10 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`box-${current}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-card/50 backdrop-blur-sm p-4 rounded-2xl border border-border/20"
          >
            <div className="flex -space-x-2 justify-center mb-3">
              {currentSlide.showAvatars ? (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="w-8 h-8 border-2 border-card">
                      <AvatarImage
                        src={`https://i.pravatar.cc/100?u=${i}`}
                        alt="User"
                      />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-card bg-primary flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    +5k
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full text-primary">
                  <Sparkles size={12} className="fill-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Potenciado por Memo AI
                  </span>
                </div>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground text-center font-bold uppercase tracking-wider">
              {currentSlide.boxTitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-1.5 justify-center mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                current === i ? 'w-6 bg-primary' : 'w-2 bg-primary/20'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
