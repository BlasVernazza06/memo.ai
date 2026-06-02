import { Brain, GraduationCap, Medal, Users } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '+5,000',
    label: 'Estudiantes activos',
    description: 'Creciendo cada semana',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: GraduationCap,
    value: '98%',
    label: 'Tasa de satisfacción',
    description: 'Según encuestas mensuales',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Brain,
    value: '+100K',
    label: 'Flashcards generadas',
    description: 'Solo este trimestre',
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
  },
  {
    icon: Medal,
    value: '4.9/5',
    label: 'Rating promedio',
    description: 'En más de 800 reseñas',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

export default function TrustSection() {
  return (
    <section className="relative py-20 md:py-28 bg-transparent select-none">
      {/* Ambient bottom bleed to blend into Features */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-500/[0.03] blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div className="flex flex-col items-center mb-16">
          <span className="text-[9px] font-black text-primary/70 uppercase tracking-[0.3em] bg-primary/5 px-4 py-1.5 rounded-lg border border-primary/15 mb-3 relative blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br">
            Métricas de Rendimiento
          </span>
          <p className="text-center text-[9px] font-black text-muted-foreground/35 uppercase tracking-[0.2em] mt-1">
            Confiado por miles de estudiantes en toda Latinoamérica
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-4 p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/25 hover:bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 text-center relative overflow-hidden blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br before:absolute before:top-0 before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/10 before:to-transparent z-10"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 ${stat.bg} border ${stat.border} rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 shadow-xs`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>

              {/* Number + labels */}
              <div>
                <div className="text-3xl md:text-4xl font-black text-foreground tracking-tighter leading-none mb-1.5 font-sans">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-[9px] font-bold text-muted-foreground/45 leading-snug uppercase tracking-wide">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
