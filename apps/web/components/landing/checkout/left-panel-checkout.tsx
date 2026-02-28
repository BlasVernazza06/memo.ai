import { Check, Sparkles, Zap } from 'lucide-react';

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
  const isPro = plan.id === 'pro';
  const PlanIcon = isPro ? Sparkles : Zap;

  return (
    <div
      className={`p-8 md:p-10 ${isPro ? 'bg-[#0F1115] text-white' : 'bg-card'}`}
    >
      {/* Plan badge */}
      {isPro && (
        <div className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/25 rounded-full px-3 py-1 mb-6">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            Plan recomendado
          </span>
        </div>
      )}

      {/* Plan icon & name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isPro ? 'bg-primary/20' : 'bg-primary/10'}`}
        >
          <PlanIcon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{plan.name}</h2>
          <p
            className={`text-xs ${isPro ? 'text-white/50' : 'text-muted-foreground'}`}
          >
            {plan.description}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1.5 mb-8 mt-6">
        <span className="text-5xl font-extrabold tracking-tighter">
          ${formattedPrice}
        </span>
        <div className="flex flex-col">
          <span
            className={`text-xs font-medium ${isPro ? 'text-white/40' : 'text-muted-foreground'}`}
          >
            USD
          </span>
          <span
            className={`text-xs font-medium ${isPro ? 'text-white/40' : 'text-muted-foreground'}`}
          >
            / mes
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        className={`border-t ${isPro ? 'border-white/10' : 'border-border'} mb-6`}
      />

      {/* Features heading */}
      <p
        className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isPro ? 'text-white/40' : 'text-muted-foreground'}`}
      >
        Lo que incluye
      </p>

      {/* Features list */}
      <ul className="space-y-3">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-start gap-2.5">
            <div
              className={`mt-0.5 p-0.5 rounded-full shrink-0 ${isPro ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}
            >
              <Check className="w-3 h-3" />
            </div>
            <span
              className={`text-sm font-light leading-tight ${isPro ? 'text-white/75' : 'text-muted-foreground'}`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Subtle note */}
      {isPro && (
        <p className="mt-8 text-[10px] text-white/25 uppercase tracking-widest text-center">
          Cancela en cualquier momento
        </p>
      )}
    </div>
  );
}
