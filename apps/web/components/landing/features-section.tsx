'use client';

import {
  BarChart3,
  BookOpen,
  Brain,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    title: 'Flashcards con IA',
    description:
      'Genera automáticamente tarjetas de memoria a partir de tus PDFs. El sistema extrae los conceptos clave y crea preguntas efectivas.',
    icon: Zap,
    className: 'col-span-1 md:col-span-2',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    title: 'Análisis Profundo',
    description: 'Análisis semántico de tus textos para resúmenes perfectos.',
    icon: Brain,
    className: 'col-span-1',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Roadmaps de Estudio',
    description:
      'Crea guías paso a paso para dominar cualquier tema según el contenido de tus propios documentos.',
    icon: BarChart3,
    className: 'col-span-1',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'Quizzes Interactivos',
    description:
      'Ponte a prueba con exámenes generados dinámicamente que simulan evaluaciones reales de tu material.',
    icon: BookOpen,
    className: 'col-span-1 md:col-span-2',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Ambient Background Elements */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="memo-container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center mb-4 gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Poderes de estudio
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight max-w-2xl">
            Todo lo que necesitas para <br />
            <span className="memo-gradient-text text-4xl md:text-5xl">
              dominar tus materias
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl font-light leading-relaxed">
            Memo AI utiliza tecnología de punta para que tu estudio sea fluido,
            rápido y efectivo.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${feature.className} group relative bg-card border border-border/50 rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:bg-white/2`}
            >
              {/* Decorative gradient corner */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-linear-to-br from-primary/10 to-transparent blur-2xl group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10 space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm font-light">
                    {feature.description}
                  </p>
                </div>

                {feature.className.includes('md:col-span-2') && (
                  <div className="pt-2 flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden"
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${30 + i * 20}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className={`h-full ${feature.bgColor.replace('/10', '')}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Final "Safety" Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1 md:col-span-3 bg-primary text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group shadow-lg"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -right-16 -top-16 w-64 h-64 border-40 border-white/5 rounded-full"
            />

            <div className="relative z-10 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Shield className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold tracking-tight">
                  Tu privacidad es sagrada
                </h3>
                <p className="text-white/80 text-sm max-w-lg font-light">
                  Documentos encriptados de extremo a extremo. Nunca entrenamos
                  modelos públicos con tus datos.
                </p>
              </div>
            </div>

            <button className="relative z-10 whitespace-nowrap bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors shadow-md">
              Saber más
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
