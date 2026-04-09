'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import {
  Check,
  type LucideIcon,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
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
  icon: LucideIcon;
  cta: string;
}

export default function PricingSection() {
  const { user } = useAuth();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly',
  );

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        interface RawPlan extends Omit<Plan, 'icon' | 'cta' | 'price' | 'popular'> {
          price: number;
          popular: boolean;
        }
        const response = await apiFetchClient<RawPlan[]>('/plans');

        if (Array.isArray(response)) {
          const mappedPlans = response.map((p: RawPlan) => ({
            ...p,
            price: p.price / 100,
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
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
          <div className="space-y-3">
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
            <p className="text-lg text-muted-foreground font-light px-4">
              Empieza gratis y escala a medida que tus necesidades aumenten.
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex flex-col items-center gap-6">
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
                className="flex items-center gap-2"
              >
                <div className="px-3 py-1 rounded-full bg-foreground text-background text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Ahorra un 20%
                </div>
              </motion.div>
            )}
          </div>
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className={`relative p-10 rounded-[2.5rem] border transition-all duration-700 overflow-hidden group ${
                  plan.popular
                    ? 'bg-foreground text-background border-primary/50 shadow-2xl md:scale-[1.02] z-20'
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
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                      Recomendado
                    </div>
                  </>
                )}

                <div className="mb-10 space-y-4 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${plan.popular ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-muted text-muted-foreground'}`}
                  >
                    <plan.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">
                      {plan.name}
                    </h3>
                    <p
                      className={`text-[13px] mt-1.5 font-medium leading-relaxed ${plan.popular ? 'text-background/60' : 'text-muted-foreground'}`}
                    >
                      {plan.description}
                    </p>
                  </div>
                  <div className="pt-4 flex items-baseline gap-2">
                    <span className="text-6xl font-black tracking-tighter">
                      $
                      {billingCycle === 'yearly'
                        ? (plan.price * 0.8).toFixed(0)
                        : plan.price}
                    </span>
                    <div className="flex flex-col">
                      <span
                        className={`text-[10px] font-black uppercase tracking-[0.2em] ${plan.popular ? 'text-background/40' : 'text-muted-foreground/60'}`}
                      >
                        USD / mes
                      </span>
                      {billingCycle === 'yearly' && (
                        <span className="text-[9px] font-bold text-emerald-500/80 uppercase">
                          Facturado anual
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 relative z-10">
                  {plan.features.map((feature) => (
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
                        className={`text-sm tracking-tight ${plan.popular ? 'text-background/80' : 'text-muted-foreground'} font-medium group-hover/item:translate-x-0.5 transition-transform duration-300`}
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
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20'
                        : 'bg-muted hover:bg-muted/80 text-foreground shadow-none'
                    }`}
                  >
                    {isDisabled ? (
                      <span>{plan.cta}</span>
                    ) : (
                      <Link href={href}>{ctaText}</Link>
                    )}
                  </Button>
                </div>

                {plan.popular && (
                  <p className="text-center mt-4 text-background/40 text-[9px] font-semibold uppercase tracking-widest relative z-10">
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
