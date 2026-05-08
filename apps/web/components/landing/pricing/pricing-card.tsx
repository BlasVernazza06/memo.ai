'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import { Plan } from './pricing-data';

interface PricingCardProps {
  plan: Plan;
  index: number;
  billingCycle: 'monthly' | 'yearly';
  userPlan?: string;
}

export function PricingCard({
  plan,
  index,
  billingCycle,
  userPlan,
}: PricingCardProps) {
  const isProUser = userPlan === 'pro';
  const isProCard = plan.id === 'pro';
  const isDisabled = isProUser && !isProCard;

  const ctaText = isProUser && isProCard ? 'Ir al Dashboard' : plan.cta;
  const href =
    isProUser && isProCard
      ? '/dashboard'
      : plan.popular
        ? `/checkout?plan=${plan.stripePriceId}&billingCycle=${billingCycle}`
        : '/dashboard';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative p-10 rounded-[2.5rem] border transition-all duration-700 overflow-hidden group ${
        plan.popular
          ? 'bg-foreground text-background border-primary/50 shadow-2xl md:scale-[1.02] z-20'
          : isDisabled
            ? 'bg-muted/40 border-border/40 text-muted-foreground grayscale z-10'
            : 'bg-card border-border/60 hover:border-border z-10'
      } ${isDisabled ? 'pointer-events-none' : ''}`}
    >
      {plan.popular && (
        <>
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors duration-700" />
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
          <h2 className="text-2xl font-black tracking-tight">{plan.name}</h2>
          <p
            className={`text-[13px] mt-1.5 font-medium leading-relaxed ${plan.popular ? 'text-background/60' : 'text-muted-foreground'}`}
          >
            {plan.description}
          </p>
        </div>
        <div className="pt-4 flex items-baseline gap-2">
          <span className="text-6xl font-black tracking-tighter">
            ${billingCycle === 'yearly' ? (plan.price * 0.8).toFixed(0) : plan.price}
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
          <li key={feature} className="flex items-start gap-3 group/item">
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
}
