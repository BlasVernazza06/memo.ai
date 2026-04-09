'use client';

import { Check, Sparkles, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlanData {
  id: string;
  name: string;
  description: string;
  price: number;
  stripePriceId: string;
  features: string[];
  popular: boolean;
}

interface LeftPanelCheckoutProps {
  plan: PlanData;
  formattedPrice: string;
}

export default function LeftPanelCheckout({
  plan,
  formattedPrice,
}: LeftPanelCheckoutProps) {
  const isPro = plan.id === 'pro' || plan.popular;
  const PlanIcon = isPro ? Sparkles : Zap;

  return (
    <div
      className={`p-6 md:p-8 lg:p-10 flex flex-col relative overflow-hidden transition-colors duration-500 ${isPro ? 'bg-slate-950 text-white' : 'bg-card'}`}
    >
      {/* Background accents for Pro */}
      {isPro && (
        <>
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
        </>
      )}

      {/* Plan badge */}
      <AnimatePresence>
        {isPro && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/30 backdrop-blur-md rounded-full px-3 py-1 mb-6 self-start shadow-lg shadow-primary/10"
          >
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
              Más Elegido
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plan icon & name */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${isPro ? 'bg-linear-to-br from-primary/30 to-blue-600/20' : 'bg-primary/10'}`}
        >
          <PlanIcon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none mb-1">{plan.name}</h2>
          <p
            className={`text-xs font-medium ${isPro ? 'text-white/50' : 'text-muted-foreground'}`}
          >
            {plan.description}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-5xl md:text-6xl font-black tracking-tighter tabular-nums drop-shadow-sm">
          ${formattedPrice}
        </span>
        <div className="flex flex-col mb-1.5">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${isPro ? 'text-white/40' : 'text-muted-foreground'}`}
          >
            USD
          </span>
          <span
            className={`text-xs font-semibold opacity-80 ${isPro ? 'text-white/40' : 'text-muted-foreground'}`}
          >
            / mes
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        className={`w-full h-px ${isPro ? 'bg-linear-to-r from-white/15 via-white/5 to-transparent' : 'bg-linear-to-r from-border/50 via-border/20 to-transparent'} mb-6`}
      />

      {/* Features section */}
      <div className="space-y-4 flex-1">
        <p
          className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${isPro ? 'text-primary/70' : 'text-primary'}`}
        >
          Lo que incluye tu plan
        </p>

        <ul className="grid gap-4">
          {plan.features.map((feature: string, idx: number) => (
            <motion.li 
              key={idx} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.05 }}
              className="flex items-start gap-3 group"
            >
              <div
                className={`mt-0.5 p-0.5 rounded-md shrink-0 transition-transform group-hover:scale-110 ${isPro ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-primary/10 text-primary border border-primary/10'}`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span
                className={`text-sm font-medium leading-tight transition-colors ${isPro ? 'text-white/80 group-hover:text-white' : 'text-muted-foreground group-hover:text-foreground'}`}
              >
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Subtle footer note */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <p className={`text-[9px] font-bold uppercase tracking-[0.3em] text-center ${isPro ? 'text-white/20' : 'text-muted-foreground/30'}`}>
          Sin contratos · Cancela cuando quieras
        </p>
      </div>
    </div>
  );
}
