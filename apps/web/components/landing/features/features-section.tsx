'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { featureDetails } from '@/components/landing/features/features-data';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background relative overflow-x-clip">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="memo-container px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/10 text-[10px] font-black uppercase tracking-widest"
            >
              <Sparkles className="w-3 h-3" />
              <span>Funcionalidades</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]"
            >
              Todo lo que necesitas
              <br />
              <span className="memo-gradient-text italic">para dominar cualquier tema.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm text-muted-foreground/80 font-medium leading-relaxed max-w-xs md:text-right"
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
              className={`group flex flex-col rounded-[2.5rem] border border-border/60 bg-card overflow-hidden hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 relative dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] shadow-[inset_0_1px_0_0_rgba(0,0,0,0.02)] before:absolute before:top-0 before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent z-10 ${feature.className}`}
            >
              {/* Mockup Area */}
              <div className="flex-1 overflow-hidden relative border-b border-border/40">
                {feature.mockup}
              </div>

              {/* Text Area */}
              <div className="p-8 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="shrink-0 w-8 h-8 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
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
