import { Check, Search, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export interface Feature {
  title: string;
  description: string;
  className: string;
  mockup: React.ReactNode;
}

const MockupBrowser = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`dark w-full bg-[#07090C] rounded-lg border border-white/10 shadow-lg overflow-hidden flex flex-col ${className}`}
  >
    <div className="h-7 bg-white/[0.02] border-b border-white/[0.08] flex items-center px-4 justify-between select-none">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>
      <div className="w-16 h-1 bg-white/10 rounded-full" />
      <div className="w-2 h-2" />
    </div>
    <div className="flex-1 p-4 bg-[#07090C] bg-dot-grid relative">{children}</div>
  </div>
);

export const featureDetails: Feature[] = [
  {
    title: 'Flashcards con IA',
    description:
      'Generación automática de tarjetas optimizadas para la retención a largo plazo.',
    className: 'lg:col-span-2 lg:row-span-1',
    mockup: (
      <div className="relative w-full h-full flex items-center justify-center p-8 bg-linear-to-br from-primary/5 to-transparent">
        <MockupBrowser className="max-w-md scale-90 group-hover:scale-95 transition-transform duration-500">
          <div className="space-y-4">
            <div className="h-3 w-1/3 bg-primary/20 rounded-full" />
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/10 rounded-full" />
              <div className="h-2 w-full bg-white/10 rounded-full" />
              <div className="h-2 w-2/3 bg-white/10 rounded-full" />
            </div>
            <div className="pt-4 flex justify-center">
              <div className="w-48 h-20 rounded-xl border border-dashed border-primary/30 flex items-center justify-center bg-primary/5">
                <Zap className="w-6 h-6 text-primary shadow-sm" />
              </div>
            </div>
          </div>
        </MockupBrowser>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-12 right-12 p-3 bg-card rounded-lg shadow-xl border border-border/80"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] font-black text-foreground uppercase tracking-wider">Generado</span>
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
      <div className="relative w-full h-full flex items-center justify-center p-8 bg-blue-500/5 overflow-hidden">
        <MockupBrowser className="w-full scale-110 opacity-30">
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-1.5 w-full bg-white/10 rounded-full"
              />
            ))}
          </div>
        </MockupBrowser>
        <div className="absolute inset-x-0 bottom-12 flex justify-center">
          <div className="px-4 py-2 bg-[#07090C] rounded-lg shadow-lg border border-primary/20 flex items-center gap-3 relative blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br">
            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
              <Search className="w-3 h-3 text-white" />
            </div>
            <span className="text-[9px] font-black text-white/90 uppercase tracking-widest font-sans">
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
      <div className="w-full h-full flex flex-col justify-end p-8 bg-primary/5 gap-4">
        <div className="space-y-3 select-none">
          {[1, 2, 3].map((i) => {
            const cardColor = i === 1 ? 'paper-card-red' : i === 2 ? 'paper-card-yellow' : 'paper-card-green';
            return (
              <div
                key={i}
                className={`bg-card/45 p-3 rounded-lg border border-border/40 shadow-xs flex items-center gap-4 transition-transform group-hover:translate-x-1 duration-500 paper-card ${cardColor}`}
              >
                <div className="flex-1 space-y-1.5">
                  <div className="h-1.5 w-1/2 bg-muted rounded-full" />
                  <div className="h-1 w-3/4 bg-muted/40 rounded-full" />
                </div>
                <div className="text-[10px] font-black text-primary">
                  {i * 30}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
  {
    title: 'Resúmenes Inteligentes',
    description:
      'Condensa horas de material en puntos clave listos para repasar en segundos.',
    className: 'lg:col-span-1 lg:row-span-1',
    mockup: (
      <div className="w-full h-full flex flex-col p-8 bg-indigo-500/5 gap-4">
        <div className="bg-card/50 p-4 rounded-lg border border-border/50 shadow-sm space-y-3 relative blueprint-cross blueprint-cross-tl blueprint-cross-tr">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <div className="h-1.5 w-16 bg-indigo-500/20 rounded-full" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/55" />
              <div className="h-1.5 w-full bg-muted/50 rounded-full" />
            </div>
          ))}
        </div>
        <div className="h-32 bg-card/10 rounded-lg border border-dashed border-indigo-500/25 relative blueprint-cross blueprint-cross-bl blueprint-cross-br" />
      </div>
    ),
  },
  {
    title: 'Evaluaciones Dinámicas',
    description:
      'Ponte a prueba con cuestionarios generados a partir de tu propio material.',
    className: 'lg:col-span-1 lg:row-span-1',
    mockup: (
      <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-b from-transparent to-primary/5 select-none">
        <div className="w-full max-w-[210px] bg-card rounded-xl border border-border/60 shadow-xl p-5 space-y-4 relative paper-card paper-card-yellow">
          <div className="space-y-1.5">
            <div className="h-2 w-full bg-muted rounded-full" />
            <div className="h-2 w-2/3 bg-muted rounded-full" />
          </div>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`h-7 w-full rounded-lg border flex items-center px-3 gap-3 transition-colors ${i === 1 ? 'border-primary/40 bg-primary/5 text-primary' : 'border-border/60 text-muted-foreground'}`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full border ${i === 1 ? 'border-primary bg-primary' : 'border-border/60'}`}
                />
                <div className="h-1.5 w-14 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];
