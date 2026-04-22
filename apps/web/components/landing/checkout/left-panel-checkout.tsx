'use client';

import { Check, Sparkles, Star, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

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
  billingCycle: string;
}

export default function LeftPanelCheckout({
  plan,
  formattedPrice,
  billingCycle,
}: LeftPanelCheckoutProps) {
  const isPro = plan.id === 'pro' || plan.popular;
  const PlanIcon = isPro ? Sparkles : Zap;

  return (
    <div
      className={`p-6 md:p-8 lg:p-10 flex flex-col relative overflow-hidden transition-all duration-700 ${isPro ? 'bg-[#0a0c10] text-white' : 'bg-card'}`}
    >
      {/* Subtle Depth Accents */}
      {isPro && (
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full opacity-50" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full opacity-30" />
        </div>
      )}

      {/* Brand & Badge */}
      <div className="relative z-10 flex flex-col gap-4 mb-6">
        <AnimatePresence>
          {isPro && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-3 py-1 self-start shadow-sm"
            >
              <Star className="w-2.5 h-2.5 text-primary" />
              <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                Selección Premium
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
             <div className={`p-1.5 rounded-lg ${isPro ? 'bg-primary/20' : 'bg-primary/10'}`}>
                <PlanIcon className="w-4 h-4 text-primary" />
             </div>
             <h2 className="text-2xl font-black tracking-tighter capitalize leading-none">
                {plan.name}
             </h2>
          </div>
          <p className={`text-[11px] font-medium ${isPro ? 'text-white/40' : 'text-muted-foreground'} max-w-xs pl-0.5`}>
            {plan.description}
          </p>
        </div>
      </div>

      {/* Price Section - Compact */}
      <div className="relative z-10 flex flex-col mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl md:text-6xl font-black tracking-tighter tabular-nums flex items-start gap-0.5 leading-none">
            <span className="text-xl mt-2 font-bold opacity-30">$</span>
            {formattedPrice}
          </span>
          <div className="flex flex-col">
            <span className={`text-[9px] font-black uppercase tracking-widest ${isPro ? 'text-white/30' : 'text-muted-foreground/50'}`}>
              USD
            </span>
            <span className={`text-[11px] font-bold ${isPro ? 'text-primary' : 'text-primary'}`}>
               / {billingCycle === 'yearly' ? 'año' : 'mes'}
            </span>
          </div>
        </div>
      </div>

      {/* Features Grid - More Compact */}
      <div className="relative z-10 flex-1">
        <h3 className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 opacity-40 ${isPro ? 'text-white' : 'text-foreground'}`}>
          Beneficios del Plan
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {plan.features.map((feature: string, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className={`p-3 rounded-xl border flex items-center gap-3 group transition-all duration-300 ${
                isPro 
                  ? 'bg-white/[0.03] border-white/5 hover:border-white/15' 
                  : 'bg-muted/30 border-border/40 hover:border-border'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                isPro ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
              }`}>
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className={`text-[11px] font-bold leading-tight ${
                isPro ? 'text-white/70 group-hover:text-white' : 'text-muted-foreground group-hover:text-foreground'
              }`}>
                {feature}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Minimal Footer */}
      <div className={`mt-6 pt-6 border-t relative z-10 ${isPro ? 'border-white/5' : 'border-border/50'}`}>
        <p className={`text-[8px] font-bold uppercase tracking-[0.4em] text-center opacity-30 ${isPro ? 'text-white' : 'text-muted-foreground'}`}>
          Cifrado de grado bancario
        </p>
      </div>
    </div>
  );
}
