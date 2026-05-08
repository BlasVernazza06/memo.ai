'use client';

import { motion } from 'motion/react';
import { Check, Minus, Sparkles } from 'lucide-react';
import { comparisonFeatures } from './pricing-data';

function FeatureCell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <div className="flex justify-center">
        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
          <Check className="w-3 h-3 text-primary" />
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <Minus className="w-4 h-4 text-border" />
      </div>
    );
  }
  return (
    <span className="text-sm font-medium text-center block text-foreground/80">
      {value}
    </span>
  );
}

export function PricingFeatureComparison() {
  return (
    <section className="py-20 border-t border-border/40">
      <div className="memo-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
            Comparación detallada
          </h2>
          <p className="text-muted-foreground font-light">
            Todo lo que incluye cada plan, sin letra pequeña.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto px-4">
          {/* Table Header */}
          <div className="grid grid-cols-3 mb-4 px-4">
            <div />
            <div className="text-center">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Free
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                Pro
              </span>
            </div>
          </div>

          <div className="space-y-8">
            {comparisonFeatures.map((section, si) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: si * 0.08 }}
              >
                <div className="px-4 py-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground/60">
                    {section.category}
                  </span>
                </div>
                <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/50">
                  {section.features.map((feat, fi) => (
                    <div
                      key={feat.name}
                      className={`grid grid-cols-3 items-center px-5 py-4 ${fi !== section.features.length - 1 ? 'border-b border-border/30' : ''} hover:bg-muted/30 transition-colors`}
                    >
                      <span className="text-sm font-medium text-foreground/80 pr-4">
                        {feat.name}
                      </span>
                      <FeatureCell value={feat.free} />
                      <FeatureCell value={feat.pro} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
