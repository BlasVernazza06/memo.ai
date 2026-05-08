'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { featureDetails } from '@/components/landing/features/features-data';

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
              className={`group flex flex-col rounded-[2.5rem] border border-border/60 bg-card overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 ${feature.className}`}
            >
              {/* Mockup Area */}
              <div className="flex-1 overflow-hidden relative border-b border-border/40">
                {feature.mockup}
              </div>

              {/* Text Area */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
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
