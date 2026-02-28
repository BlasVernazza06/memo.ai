'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import { Check, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  stripePriceId: string;
  features: string[];
  popular: boolean;
  icon: any;
  cta: string;
}

export default function PricingSection() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('api/payments/plans');
        if (!response.ok) throw new Error('Failed to fetch plans');

        const data = await response.json();

        if (Array.isArray(data)) {
          const mappedPlans = data.map((p: any) => ({
            ...p,
            price: (p.price / 100).toString(),
            icon: p.id === 'pro' ? Sparkles : Zap,
            cta: p.id === 'pro' ? 'Obtener Pro ahora' : 'Comenzar gratis',
            stripePriceId: p.stripePriceId,
          }));
          setPlans(mappedPlans);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <section
      className="py-24 relative overflow-hidden bg-background"
      id="pricing"
    >
      {/* Background decoration */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="memo-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center mb-4 gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-0.5 mx-auto w-fit"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Inversión en tu futuro
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Planes que{' '}
            <span className="memo-gradient-text">crecen contigo</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Empieza gratis y escala a medida que tus necesidades aumenten.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto px-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-4xl border transition-all duration-500 overflow-hidden group ${
                plan.popular
                  ? 'bg-[#0F1115] text-white border-primary shadow-2xl shadow-primary/20 md:transform md:scale-105 z-20'
                  : 'bg-card border-border hover:border-primary/30 z-10'
              }`}
            >
              {plan.popular && (
                <>
                  <div className="absolute top-0 right-0 p-6">
                    <Sparkles className="w-8 h-8 text-primary opacity-20 group-hover:opacity-40 transition-opacity" />
                  </div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/30">
                    Recomendado
                  </div>
                </>
              )}

              <div className="mb-8 space-y-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}
                >
                  <plan.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {plan.name}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${plan.popular ? 'text-white/60' : 'text-muted-foreground'}`}
                  >
                    {plan.description}
                  </p>
                </div>
                <div className="pt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tighter">
                    ${plan.price}
                  </span>
                  <span
                    className={`text-xs ${plan.popular ? 'text-white/40' : 'text-muted-foreground'} font-medium`}
                  >
                    USD / mes
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 group/item"
                  >
                    <div
                      className={`mt-1 p-0.5 rounded-full ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                    <span
                      className={`text-sm ${plan.popular ? 'text-white/80' : 'text-muted-foreground'} font-light group-hover/item:translate-x-1 transition-transform`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full py-6 rounded-xl text-md font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
                    : 'bg-muted hover:bg-muted/80 text-foreground shadow-none'
                }`}
              >
                <Link
                  href={
                    plan.popular
                      ? `/checkout?plan=${plan.stripePriceId}`
                      : '/dashboard'
                  }
                >
                  {plan.cta}
                </Link>
              </Button>

              {plan.popular && (
                <p className="text-center mt-4 text-white/30 text-[9px] font-medium uppercase tracking-widest">
                  Cancela en cualquier momento
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
