import { Check } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";


export default async function PricingSection() {
  const plans = [
    {
      name: "Free",
      description: "Plan gratuito",
      price: 0,
      features: [
        "Acceso a todas las características",
        "Sin límites de uso",
        "Soporte técnico limitado",
      ],
      popular: false,
      cta: "Comenzar gratis",
    },
    {
      name: "Pro",
      description: "Plan profesional",
      price: 9.99,
      features: [
        "Acceso a todas las características",
        "Sin límites de uso",
        "Soporte técnico limitado",
      ],
      popular: true,
      cta: "Comenzar ahora",
    },
  ];

  return (
    <section className="py-24 bg-card/50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planes simples y transparentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Elige el plan que mejor se adapte a tus necesidades de estudio.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative p-6 rounded-2xl border transition-all ${
                plan.popular 
                  ? 'bg-card border-primary shadow-xl shadow-primary/10 scale-105' 
                  : 'bg-card border-border hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  Más popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                asChild 
                className={`w-full rounded-full ${plan.popular ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                variant={plan.popular ? "default" : "secondary"}
              >
                <Link href={`/checkout?plan=${plan.name.toLowerCase()}`}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
