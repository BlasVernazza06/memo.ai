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
          ? 'bg-gradient-to-br from-primary/95 via-primary to-indigo-950 text-white border-primary/30 shadow-2xl shadow-primary/20 md:scale-[1.02] z-20 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]'
          : isDisabled
            ? 'bg-muted/40 border-border/40 text-muted-foreground grayscale z-10'
            : 'bg-card border-border/60 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/5 z-10 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] shadow-[inset_0_1px_0_0_rgba(0,0,0,0.02)] before:absolute before:top-0 before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent'
      } ${isDisabled ? 'pointer-events-none' : ''}`}
    >
      {plan.popular && (
        <>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-colors duration-700 animate-pulse" />
          <div className="absolute top-6 right-6">
            <Sparkles className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md shadow-xs">
            Recomendado
          </div>
        </>
      )}

      <div className="mb-10 space-y-4 relative z-10">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${plan.popular ? 'bg-white/10 text-white border border-white/20' : 'bg-muted text-muted-foreground'}`}
        >
          <plan.icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight">{plan.name}</h2>
          <p
            className={`text-[13px] mt-1.5 font-medium leading-relaxed ${plan.popular ? 'text-white/70' : 'text-muted-foreground'}`}
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
              className={`text-[10px] font-black uppercase tracking-[0.2em] ${plan.popular ? 'text-white/50' : 'text-muted-foreground/60'}`}
            >
              USD / mes
            </span>
            {billingCycle === 'yearly' && (
              <span className={`text-[9px] font-bold uppercase ${plan.popular ? 'text-emerald-300' : 'text-emerald-500/80'}`}>
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
              className={`mt-0.5 p-1 rounded-md ${plan.popular ? 'bg-white/15 text-white' : 'bg-muted text-muted-foreground'}`}
            >
              <Check className="w-3 h-3" />
            </div>
            <span
              className={`text-sm tracking-tight ${plan.popular ? 'text-white/95' : 'text-muted-foreground'} font-medium group-hover/item:translate-x-0.5 transition-transform duration-300`}
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
          className={`w-full py-6 rounded-xl text-sm font-bold transition-all duration-300 ${
            plan.popular
              ? 'bg-white hover:bg-white/95 text-primary hover:text-primary/90 shadow-lg shadow-black/10 font-extrabold hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-muted hover:bg-muted/80 text-foreground shadow-none hover:scale-[1.02] active:scale-[0.98]'
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
        <p className="text-center mt-4 text-white/50 text-[9px] font-semibold uppercase tracking-widest relative z-10">
          Cancela en cualquier momento
        </p>
      )}
    </motion.div>
  );
}
