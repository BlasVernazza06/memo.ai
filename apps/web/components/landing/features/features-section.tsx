'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { featureDetails } from '@/components/landing/features/features-data';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 md:py-36 bg-transparent relative overflow-x-clip">
      {/* Ambient background glow — smooth overlapping transitions */}
      <div className="absolute -top-12 left-1/3 w-[800px] h-[550px] bg-indigo-500/[0.045] blur-[160px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute -bottom-16 right-1/4 w-[750px] h-[500px] bg-primary/[0.035] blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="memo-container px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 select-none">
          <div className="space-y-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-primary/5 text-primary border border-primary/15 text-[9px] font-black uppercase tracking-[0.15em] relative blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Funcionalidades</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]"
            >
              Todo lo que necesitas <br />
              <span className="font-serif italic text-primary font-normal tracking-wide py-2">para dominar cualquier tema.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm text-muted-foreground/80 font-medium leading-relaxed max-w-xs md:text-right uppercase tracking-wide text-[11px]"
          >
            Cada funcionalidad está diseñada para maximizar tu retención y acelerar tu aprendizaje.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[340px]">
          {featureDetails.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.07 }}
              className={`group flex flex-col rounded-xl border border-border/50 bg-card/40 hover:border-primary/20 hover:bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-700 relative overflow-hidden blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br z-10 ${feature.className}`}
            >
              {/* Mockup Area */}
              <div className="flex-1 overflow-hidden relative border-b border-border/40 bg-zinc-950/5 dark:bg-zinc-900/5 select-none">
                {feature.mockup}
              </div>

              {/* Text Area */}
              <div className="p-6 md:p-8 flex items-start justify-between gap-4 bg-card/65 backdrop-blur-xs">
                <div>
                  <h3 className="text-lg md:text-xl font-black text-foreground mb-1.5 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
