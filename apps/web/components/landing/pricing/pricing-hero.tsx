'use client';

import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

interface PricingHeroProps {
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export function PricingHero({ billingCycle, setBillingCycle }: PricingHeroProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="memo-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Planes y precios
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Elige el plan que{' '}
            <span className="memo-gradient-text">impulsa tu aprendizaje</span>
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Empieza gratis sin tarjeta de crédito. Escala a Pro cuando
            necesites más potencia.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4 mt-10"
        >
          <div className="bg-muted p-1 rounded-xl inline-flex items-center border border-border relative shadow-sm">
            <motion.div
              initial={false}
              animate={{ x: billingCycle === 'monthly' ? 0 : '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-background rounded-lg shadow-sm z-0"
            />
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-10 py-2.5 text-xs font-bold z-10 transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`relative px-10 py-2.5 text-xs font-bold z-10 transition-colors duration-300 ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Anual
            </button>
          </div>

          {billingCycle === 'yearly' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              Ahorra un 20%
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
