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
    <section className="relative">
      {/* Soft gradient separator lines */}

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <p className="text-center text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] mb-14">
          Confiado por miles de estudiantes en toda Latinoamérica
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border border-border/40 bg-card/40 hover:border-primary/25 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 text-center relative overflow-hidden dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] shadow-[inset_0_1px_0_0_rgba(0,0,0,0.01)] before:absolute before:top-0 before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/10 before:to-transparent z-10"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 ${stat.bg} border ${stat.border} rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>

              {/* Number + labels */}
              <div>
                <div className="text-4xl font-black text-foreground tracking-tight leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-[11px] font-black text-muted-foreground/80 uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-[10px] font-medium text-muted-foreground/50 leading-snug">
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
