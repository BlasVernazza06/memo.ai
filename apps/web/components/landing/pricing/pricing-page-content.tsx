'use client';

import { useEffect, useState } from 'react';

import { Sparkles, Zap } from 'lucide-react';

import { PricingCards } from '@/components/landing/pricing/pricing-cards';
import { PricingCTA } from '@/components/landing/pricing/pricing-cta';
import { PLAN_FEATURES, Plan } from '@/components/landing/pricing/pricing-data';
import { PricingFAQ } from '@/components/landing/pricing/pricing-faq';
import { PricingFeatureComparison } from '@/components/landing/pricing/pricing-feature-comparison';
import { PricingHeader } from '@/components/landing/pricing/pricing-header';
import { PricingHero } from '@/components/landing/pricing/pricing-hero';
import { TestimonialStrip } from '@/components/landing/pricing/testimonial-strip';
import { apiFetchClient } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-provider';

export default function PricingPageContent() {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PricingHeader />

      <main>
        <PricingHero
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
        />

        <PricingCards
          plans={plans}
          loading={loading}
          billingCycle={billingCycle}
          userPlan={user?.plan}
        />

        <PricingFeatureComparison />

        <TestimonialStrip />

        <PricingFAQ />

        <PricingCTA />
      </main>
    </div>
  );
}
