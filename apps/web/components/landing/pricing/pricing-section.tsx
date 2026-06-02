'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import { type LucideIcon, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

import PricingBillingToggle from '@/components/landing/pricing/pricing-billing-toggle';
import { PricingCards } from '@/components/landing/pricing/pricing-cards';
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

const PLAN_FEATURES: Record<string, string[]> = {
  free: [
    '3 workspaces',
    'Carga de archivos hasta 5 MB',
    '20 resúmenes con IA / mes',
    '10 quizzes generados / mes',
    '50 flashcards automáticas / mes',
    'Soporte por email',
  ],
  pro: [
    'Workspaces ilimitados',
    'Carga de archivos hasta 100 MB',
    'Resúmenes con IA ilimitados',
    'Quizzes ilimitados',
    'Flashcards ilimitadas',
    'Soporte prioritario',
    'Acceso anticipado a nuevas features',
  ],
};

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
        interface RawPlan extends Omit<
          Plan,
          'icon' | 'cta' | 'price' | 'popular'
        > {
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
            features: PLAN_FEATURES[p.id] ?? p.features,
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
      className="py-28 md:py-36 relative overflow-x-clip bg-transparent"
      id="pricing"
    >
      {/* Background decoration - smooth overlapping transitions */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-violet-500/[0.04] blur-[170px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute bottom-0 left-[10%] w-[600px] h-[400px] bg-sky-500/[0.03] blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="memo-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center mb-4 gap-2 bg-primary/5 border border-primary/15 rounded-lg px-4 py-1.5 mx-auto w-fit relative blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                Inversión en tu futuro
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">
              Planes que <br />
              <span className="font-serif italic text-primary font-normal tracking-wide py-2">crecen contigo.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed max-w-lg mx-auto mt-6">
              Empieza gratis y escala a medida que tus necesidades aumenten.
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <PricingBillingToggle
            billingCycle={billingCycle}
            onBillingCycleChange={setBillingCycle}
          />
        </div>

        <PricingCards
          plans={plans}
          loading={loading}
          billingCycle={billingCycle}
          userPlan={user?.plan}
        />

        {/* Link to detailed pricing page */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-3"
        >
          <Link
            href="/pricing"
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Ver comparación completa de planes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
