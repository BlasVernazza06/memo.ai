'use client';

import { PricingCard } from './pricing-card';
import { Plan } from './pricing-data';

interface PricingCardsProps {
  plans: Plan[];
  loading: boolean;
  billingCycle: 'monthly' | 'yearly';
  userPlan?: string;
}

export function PricingCards({
  plans,
  loading,
  billingCycle,
  userPlan,
}: PricingCardsProps) {
  return (
    <section className="pb-16">
      <div className="memo-container">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto px-4">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                index={index}
                billingCycle={billingCycle}
                userPlan={userPlan}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
