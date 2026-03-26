import { useEffect, useState } from 'react';
import Image from 'next/image';

import {
  BookOpen,
  FileText,
  Link as LinkIcon,
  MessageSquare,
  Sparkles,
  Youtube,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const slides = [
  {
    title: (
      <>
        Estudia mejor <span className="text-primary">en cualquier lugar</span>
      </>
    ),
    description:
      'Tu biblioteca de conocimiento potenciada por IA vive donde tú estés.',
    footer: (
      <>
        Compatible con{' '}
        <span className="text-foreground">PDFs, YouTube, Notion</span> y las{' '}
        <br />
        principales plataformas para una experiencia fluida.
      </>
    ),
  },
  {
    title: (
      <>
        Tus archivos <span className="text-primary">ahora tienen voz</span>
      </>
    ),
    description: 'Chatea con tus documentos y obtén respuestas al instante.',
    footer: (
      <>
        Soporta <span className="text-foreground">PDF, EPUB y TXT</span> con{' '}
        <br />
        procesamiento de lenguaje natural avanzado.
      </>
    ),
  },
  {
    title: (
      <>
        Aprende de <span className="text-primary">YouTube</span>
      </>
    ),
    description:
      'Extrae conceptos clave de cualquier video sin perder el tiempo.',
    footer: (
      <>
        Genera <span className="text-foreground">Resúmenes y Quizzes</span>{' '}
        automáticamente <br />
        mientras miras tus canales favoritos.
      </>
    ),
  },
];

export default function AuthRightPanel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[current]!;

  return (
    <div className="hidden md:flex w-[45%] bg-blue-50/50 dark:bg-blue-950/20 p-12 flex-col justify-between relative overflow-hidden border-l border-border/40">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl shadow-inner" />

      <motion.div
        key={`header-${current}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center space-y-3"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          {currentSlide.title}
        </h2>
        <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium">
          {currentSlide.description}
        </p>
      </motion.div>

      {/* Orbit Visualization */}
      <div className="relative flex items-center justify-center h-full">
        {/* Orbit rings */}
        <div className="absolute w-[280px] h-[280px] border border-primary/10 rounded-full" />
        <div className="absolute w-[180px] h-[180px] border border-primary/20 rounded-full" />

        {/* Central Logo */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-24 h-24 bg-card rounded-[2rem] shadow-2xl flex items-center justify-center p-5 border border-primary/10 shadow-primary/10"
        >
          <Image
            src="/logo.webp"
            alt="Memo Logo"
            width={60}
            height={60}
            className="rounded-xl"
          />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Orbiting Icons */}
        {[
          {
            icon: FileText,
            delay: 0,
            radius: 140,
            color: 'text-blue-500',
            label: 'PDFs',
          },
          {
            icon: Youtube,
            delay: 1,
            radius: 140,
            color: 'text-red-500',
            label: 'YouTube',
          },
          {
            icon: BookOpen,
            delay: 2,
            radius: 140,
            color: 'text-green-500',
            label: 'Libros',
          },
          {
            icon: MessageSquare,
            delay: 0.5,
            radius: 90,
            color: 'text-purple-500',
            label: 'IA',
          },
          {
            icon: LinkIcon,
            delay: 1.5,
            radius: 90,
            color: 'text-amber-500',
            label: 'Web',
          },
        ].map((item, idx) => {
          return (
            <motion.div
              key={idx}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + idx * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute"
              style={{
                width: item.radius * 2,
                height: item.radius * 2,
              }}
            >
              <motion.div
                className="w-10 h-10 bg-card rounded-xl shadow-lg flex items-center justify-center absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-border/50 group"
                animate={{ rotate: [0, -360] }}
                transition={{
                  duration: 20 + idx * 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-card text-[9px] font-bold px-2 py-1 rounded-md shadow-sm border border-border/50">
                  {item.label}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={`footer-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-muted-foreground text-xs font-semibold text-center italic opacity-80 leading-relaxed"
          >
            {currentSlide.footer}
          </motion.p>
        </AnimatePresence>

        {/* Page dots indicator */}
        <div className="flex gap-1.5 justify-center mt-6">
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

