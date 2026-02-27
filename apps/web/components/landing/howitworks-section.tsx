'use client';

import { BookOpen, Sparkles, Trophy, Upload } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Sube tu PDF',
    description:
      'Arrastra cualquier documento: resúmenes, libros, exámenes modelo o apuntes de clase.',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'La IA lo analiza',
    description:
      'Nuestra inteligencia artificial extrae los conceptos clave y estructura el contenido.',
  },
  {
    icon: BookOpen,
    number: '03',
    title: 'Estudia de forma inteligente',
    description:
      'Recibe flashcards, roadmaps y tareas personalizadas para maximizar tu aprendizaje.',
  },
  {
    icon: Trophy,
    number: '04',
    title: 'Alcanza tus metas',
    description:
      'Mantén tu racha, gana logros y aprueba tus exámenes con confianza.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function HowItWorkSection() {
  return (
    <section className="py-24 bg-card/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Cómo funciona
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            En 4 simples pasos, transforma cualquier material en tu mejor aliado
            de estudio.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative text-center group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] overflow-hidden bg-muted">
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileInView={{ x: '0%' }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      ease: 'easeInOut',
                    }}
                    className="w-full h-full bg-gradient-to-r from-primary/50 to-primary"
                  />
                </div>
              )}

              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.3 }}
                className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-background border border-border shadow-sm mb-6 z-10 group-hover:border-primary/50 group-hover:shadow-md transition-all duration-300"
              >
                <step.icon className="w-10 h-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center ring-4 ring-card">
                  {step.number}
                </div>
              </motion.div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
