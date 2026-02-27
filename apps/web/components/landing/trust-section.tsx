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
    <section className="py-20 bg-muted/30 relative border-y border-border/50 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10" />

      <div className="memo-container px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-10 text-muted-foreground/80"
        >
          <div className="h-px w-12 bg-border" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            Más de 50.000 horas estudiadas en
          </span>
          <div className="h-px w-12 bg-border" />
        </motion.div>

        <div className="flex overflow-hidden group">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex items-center gap-16 whitespace-nowrap min-w-full"
          >
            {[...universities, ...universities].map((uni, index) => (
              <div
                key={index}
                className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group-hover:[animation-play-state:paused]"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-foreground">
                  {uni}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
