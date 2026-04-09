'use client';

import { Check, Search, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const MockupBrowser = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`w-full bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col ${className}`}
  >
    <div className="h-8 bg-muted/30 border-b border-border flex items-center px-4 gap-1.5">
      <div className="w-2 h-2 rounded-full bg-border" />
      <div className="w-2 h-2 rounded-full bg-border" />
      <div className="w-2 h-2 rounded-full bg-border" />
    </div>
    <div className="flex-1 p-4 bg-white">{children}</div>
  </div>
);

const featureDetails = [
  {
    title: 'Flashcards con IA',
    description:
      'Generación automática de tarjetas optimizadas para la retención a largo plazo.',
    className: 'lg:col-span-2 lg:row-span-1',
    mockup: (
      <div className="relative w-full h-full flex items-center justify-center p-8 bg-slate-50">
        <MockupBrowser className="max-w-md scale-90 group-hover:scale-95 transition-transform duration-500">
          <div className="space-y-4">
            <div className="h-3 w-1/3 bg-primary/10 rounded-full" />
            <div className="space-y-2">
              <div className="h-2 w-full bg-muted rounded-full" />
              <div className="h-2 w-full bg-muted rounded-full" />
              <div className="h-2 w-2/3 bg-muted rounded-full" />
            </div>
            <div className="pt-4 flex justify-center">
              <div className="w-48 h-24 rounded-xl border-2 border-dashed border-primary/20 flex items-center justify-center bg-primary/5">
                <Zap className="w-8 h-8 text-primary shadow-sm" />
              </div>
            </div>
          </div>
        </MockupBrowser>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-12 right-12 p-3 bg-white rounded-xl shadow-xl border border-border"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-xs font-bold text-foreground">Generado</span>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: 'Análisis Semántico Avanzado',
    description:
      'Nuestra red neuronal identifica los conceptos vitales de cualquier texto.',
    className: 'lg:col-span-1 lg:row-span-1',
    mockup: (
      <div className="relative w-full h-full flex items-center justify-center p-8 bg-blue-50/50 overflow-hidden">
        <MockupBrowser className="w-full scale-110 opacity-60">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-1.5 w-full bg-blue-900/5 rounded-full"
              />
            ))}
          </div>
        </MockupBrowser>
        <div className="absolute inset-x-0 bottom-12 flex justify-center">
          <div className="px-4 py-2 bg-white rounded-full shadow-lg border border-blue-100 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <Search className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">
              Analizando...
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Métricas integradas',
    description: 'Analiza tu progreso en tiempo real y recibe feedback.',
    className: 'lg:col-span-1 lg:row-span-1',
    mockup: (
      <div className="w-full h-full flex flex-col justify-end p-8 bg-slate-50 gap-4">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-3 rounded-lg border border-border shadow-xs flex items-center gap-4"
            >
              <div className="flex-1 space-y-2">
                <div className="h-1.5 w-1/2 bg-muted rounded-full" />
                <div className="h-1 w-full bg-slate-100 rounded-full" />
              </div>
              <div className="text-[10px] font-bold text-primary">
                {i * 30}%
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Resúmenes Inteligentes',
    description: 'Condensa horas de material en puntos clave listos para repasar en segundos.',
    className: 'lg:col-span-1 lg:row-span-1',
    mockup: (
      <div className="w-full h-full flex flex-col p-8 bg-indigo-50/30 gap-4">
        <div className="bg-white p-4 rounded-xl border border-border shadow-sm space-y-3">
           <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <div className="h-1.5 w-20 bg-indigo-900/10 rounded-full" />
           </div>
           {[1, 2, 3].map(i => (
             <div key={i} className="flex gap-2">
                <div className="w-1 h-1 rounded-full bg-indigo-300 mt-1" />
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
             </div>
           ))}
        </div>
        <div className="h-32 bg-white/50 rounded-xl border border-dashed border-indigo-200" />
      </div>
    )
  },
  {
    title: 'Evaluaciones Dinámicas',
    description: 'Ponte a prueba con cuestionarios generados a partir de tu propio material.',
    className: 'lg:col-span-1 lg:row-span-1',
    mockup: (
      <div className="w-full h-full flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-[220px] bg-white rounded-2xl border border-border shadow-xl p-5 space-y-4">
           <div className="space-y-1.5">
              <div className="h-2 w-full bg-muted rounded-full" />
              <div className="h-2 w-2/3 bg-muted rounded-full" />
           </div>
           <div className="space-y-2">
              {[1, 2].map(i => (
                <div key={i} className={`h-8 w-full rounded-lg border flex items-center px-3 gap-3 ${i === 1 ? 'border-primary/20 bg-primary/5' : 'border-border'}`}>
                   <div className={`w-3 h-3 rounded-full border ${i === 1 ? 'border-primary bg-primary' : 'border-border'}`} />
                   <div className="h-1.5 w-16 bg-muted rounded-full" />
                </div>
              ))}
           </div>
        </div>
      </div>
    )
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background relative">
      <div className="memo-container px-4">
        {/* Minimal Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/10 text-[10px] font-bold uppercase tracking-widest mx-auto"
          >
            <Sparkles className="w-3 h-3" />
            <span>Memo Features</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tight"
          >
            Todo lo que necesitas para <br />
            <span className="memo-gradient-text italic">
              dominar tus materias.
            </span>
          </motion.h2>
        </div>

        {/* Bento Grid layout with Light Design */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[340px]">
          {featureDetails.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              className={`group flex flex-col rounded-[2.5rem] border border-border/60 bg-white overflow-hidden hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 ${feature.className}`}
            >
              {/* Mockup Area */}
              <div className="flex-1 overflow-hidden relative border-b border-border/40">
                {feature.mockup}
              </div>

              {/* Text Area */}
              <div className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground/60 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
