'use client';

import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

const universities = [
  'Complutense',
  'UNAM México',
  'UBA Argentina',
  'Tec de Monterrey',
  'U. de Chile',
  'Salamanca',
  'Harvard Extension',
  'Politécnico Milán',
];

export default function TrustSection() {
  return (
    <section className="py-24 bg-background">
      <div className="memo-container px-4">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-muted text-muted-foreground border border-border px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] w-fit mb-6"
            >
              Comunidad Global
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Impulsando mentes en las instituciones más exigentes.
            </h2>
            <p className="text-sm text-muted-foreground/60 font-medium">
              Memo.ai es la herramienta de elección para estudiantes que buscan
              un rendimiento académico superior.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 grayscale opacity-40">
            {universities.map((uni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm font-bold tracking-tight text-foreground whitespace-nowrap group-hover:text-primary transition-colors">
                  {uni}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
