'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import { Check, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';

import { apiFetchClient } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-provider';

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
  const { user } = useAuth();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiFetchClient<Plan[]>('/plans');

        if (Array.isArray(response)) {
          const mappedPlans = response.map((p: any) => ({
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
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/[0.03] blur-[100px] rounded-full pointer-events-none" />

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
          {plans.map((plan, index) => {
            const isProUser = user?.plan === 'pro';
            const isProCard = plan.id === 'pro';
            const isDisabled = isProUser && !isProCard;

            const ctaText =
              isProUser && isProCard ? 'Ir al Dashboard' : plan.cta;
            const href =
              isProUser && isProCard
                ? '/dashboard'
                : plan.popular
                  ? `/checkout?plan=${plan.stripePriceId}`
                  : '/dashboard';

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden group ${
                  plan.popular
                    ? 'bg-zinc-950 text-white border-primary/50 shadow-2xl md:scale-[1.02] z-20'
                    : 'bg-card border-border/60 hover:border-border z-10'
                } ${isDisabled ? 'opacity-60 pointer-events-none' : ''}`}
              >
                {/* Subtle Background effects for Popular Card */}
                {plan.popular && (
                  <>
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors duration-700" />
                  </>
                )}

                {plan.popular && (
                  <>
                    <div className="absolute top-6 right-6">
                      <Sparkles className="w-5 h-5 text-primary/40 group-hover:text-primary/60 transition-colors" />
                    </div>
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider border border-primary/20">
                      Recomendado
                    </div>
                  </>
                )}

                <div className="mb-8 space-y-3 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.popular ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-muted text-muted-foreground'}`}
                  >
                    <plan.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 font-medium ${plan.popular ? 'text-zinc-400' : 'text-muted-foreground'}`}
                    >
                      {plan.description}
                    </p>
                  </div>
                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter">
                      ${plan.price}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${plan.popular ? 'text-zinc-500' : 'text-muted-foreground/60'}`}
                    >
                      USD / mes
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 relative z-10">
                  {plan.features.map((feature, i) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 group/item"
                    >
                      <div
                        className={`mt-0.5 p-1 rounded-md ${plan.popular ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <span
                        className={`text-sm tracking-tight ${plan.popular ? 'text-zinc-300' : 'text-muted-foreground'} font-medium group-hover/item:translate-x-0.5 transition-transform duration-300`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="relative z-10">
                  <Button
                    disabled={isDisabled}
                    asChild
                    className={`w-full py-6 rounded-xl text-sm font-bold transition-all ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 shadow-none dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100'
                    }`}
                  >
                    {isDisabled ? (
                      <span>{plan.cta}</span>
                    ) : (
                      <Link href={href}>
                        {ctaText}
                      </Link>
                    )}
                  </Button>
                </div>

                {plan.popular && (
                  <p className="text-center mt-4 text-zinc-600 text-[9px] font-semibold uppercase tracking-widest relative z-10">
                    Cancela en cualquier momento
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
