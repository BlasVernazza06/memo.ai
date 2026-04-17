'use client';

import { motion } from 'motion/react';
import { 
  FileUp, 
  Target,
  Check,
  Sparkles,
  Zap,
  BrainCircuit,
  FileText
} from 'lucide-react';

const steps = [
  {
    icon: FileUp,
    title: 'Carga tu material',
    description: 'Sube PDFs, fotos de tus apuntes o grabaciones. Nuestra IA entiende cualquier formato de estudio.',
    mockup: (
      <div className="w-full h-44 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 p-6 mt-6 flex flex-col items-center justify-center relative overflow-hidden group/m">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-card shadow-xl border border-indigo-500/20 flex items-center justify-center mb-4 transition-transform duration-500 group-hover/m:-translate-y-2">
            <FileText className="w-8 h-8 text-indigo-500" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-2 w-20 bg-indigo-500/20 rounded-full mx-auto" />
            <div className="h-1.5 w-12 bg-indigo-500/10 rounded-full mx-auto" />
          </div>
        </div>
        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20" 
        />
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-4 right-4 w-6 h-6 rounded-lg bg-indigo-500/5 border border-indigo-500/10" 
        />
      </div>
    )
  },
  {
    icon: BrainCircuit,
    title: 'Análisis Inteligente',
    description: 'La IA procesa el contenido, identifica los conceptos clave y crea una estructura de aprendizaje óptima.',
    mockup: (
      <div className="w-full h-44 bg-sky-500/5 rounded-2xl border border-sky-500/10 p-5 mt-6 relative overflow-hidden group/m">
        <div className="space-y-3 relative z-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 bg-card/80 backdrop-blur-md rounded-xl shadow-xs border border-sky-500/10">
              <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-sky-500 animate-pulse shadow-[0_0_8px_rgba(14,165,233,0.5)]' : 'bg-sky-500/20'}`} />
              <div className="space-y-1.5 flex-1">
                <div className={`h-1.5 rounded-full bg-sky-500/20 ${i === 1 ? 'w-full' : 'w-3/4'}`} />
                <div className="h-1 w-1/2 rounded-full bg-sky-500/10" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Scanning beam effect */}
        <motion.div
          animate={{ top: ['-20%', '120%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-10 bg-linear-to-b from-transparent via-sky-500/10 to-transparent pointer-events-none z-20"
        />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Sparkles className="w-24 h-24 text-sky-500/5" />
        </div>
      </div>
    )
  },
  {
    icon: Target,
    title: 'Tu Plan de Éxito',
    description: 'Recibe flashcards automáticas, resúmenes enfocados y un roadmap para no olvidar nada jamás.',
    mockup: (
      <div className="w-full h-44 bg-violet-500/5 rounded-2xl border border-violet-500/10 p-4 mt-6 flex gap-3 group/m">
        {/* Flashcard preview */}
        <div className="flex-1 bg-card rounded-xl shadow-xl border border-violet-500/20 p-4 flex flex-col gap-3 transition-transform duration-500 group-hover/m:-rotate-2 group-hover/m:scale-105">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3 h-3 text-violet-500" />
            <span className="text-[9px] font-black text-violet-400 uppercase tracking-tight">Flashcard #42</span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-violet-500/20 rounded-full" />
            <div className="h-1.5 w-2/3 bg-violet-500/10 rounded-full" />
          </div>
          <div className="mt-auto h-7 bg-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
            <span className="text-[9px] font-bold text-white">Recordar ahora</span>
          </div>
        </div>
        {/* Analytics preview */}
        <div className="w-16 bg-card/40 rounded-xl border border-violet-500/10 p-2 flex flex-col gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 w-full bg-violet-500/10 rounded-sm relative overflow-hidden">
               <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: `${i * 20}%` }}
                className="absolute bottom-0 left-0 right-0 bg-violet-500/40"
               />
            </div>
          ))}
        </div>
      </div>
    )
  },
];

const CurvedArrow = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 40" 
    fill="none" 
    className={className}
    preserveAspectRatio="none"
  >
    <path 
      d="M5 20C20 5 45 5 50 15C55 25 80 35 95 20" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeDasharray="4 4"
      className="text-muted-foreground/30"
    />
    <path 
      d="M90 15L95 20L90 25" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="text-muted-foreground/30"
    />
  </svg>
);

export default function HowItWorkSection() {
  const springTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  return (
    <section className="py-24 bg-background overflow-hidden relative" id="how-it-works">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.03),transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.03),transparent_40%)] pointer-events-none" />

      <div className="memo-container relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 bg-primary/5 text-primary border border-primary/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] w-fit mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Flujo de trabajo inteligente
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springTransition}
            className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]"
          >
            Del papel a tu memoria <br />
            <span className="memo-gradient-text italic">en cuestión de segundos.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="text-xl text-muted-foreground mt-8 max-w-2xl font-medium leading-relaxed"
          >
            Automatizamos la parte difícil del estudio para que tú solo tengas que enfocarte en dominar el conocimiento.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springTransition, delay: index * 0.1 }}
                className="group flex flex-col p-8 md:p-10 rounded-[2.5rem] border border-border/40 bg-card hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 relative overflow-hidden"
              >
                {/* Numbered background decal */}
                <div className="absolute -top-4 -right-4 text-9xl font-black text-foreground/[0.02] pointer-events-none select-none">
                  {index + 1}
                </div>

                <div className="flex items-center gap-5 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:rotate-3 shadow-sm">
                    <step.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-base text-muted-foreground font-medium leading-relaxed mb-8 flex-1">
                  {step.description}
                </p>

                {step.mockup}
              </motion.div>

              {/* Decorative Curvy Arrows between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-10 w-20 h-10 -translate-y-1/2 z-20 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.2) }}
                  >
                    <CurvedArrow className="w-full h-full" />
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
