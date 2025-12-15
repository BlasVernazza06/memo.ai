"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";

const plans = [
  {
    name: "Gratis",
    price: "0",
    description: "Para probar la magia",
    features: [
      "Hasta 1 PDFs al mes", // Aumenté un poco para generar hábito
      "10 flashcards por documento",
      "Modo de estudio web",
      "Racha de estudio básica"
    ],
    cta: "Comenzar gratis",
    popular: false
  },
  {
    name: "Pro",
    price: "4.99",
    description: "Para aprobar exámenes",
    features: [
      "PDFs ilimitados",
      "Flashcards ilimitadas",
      "Exportar a Anki (.apkg)", // ¡CRUCIAL! Tu propuesta de valor única
      "Modo Simulacro de Examen", // Más atractivo que "Tareas"
      "Estadísticas de progreso",
      "Soporte prioritario"
    ],
    cta: "Elegir Pro",
    popular: true
  },
  {
    name: "Equipo",
    price: "9.99",
    description: "Para grupos de estudio",
    features: [
      "Todo lo de Pro incluido",
      "Hasta 5 miembros",
      "Compartir mazos al instante",
      "Ranking competitivo grupal",
      "Gestión de roles"
    ],
    cta: "Crear grupo",
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-card/50" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planes simples y transparentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Elige el plan que mejor se adapte a tus necesidades de estudio.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                <Link 
                  href={plan.name === "Gratis" ? "/dashboard" : `/checkout?plan=${plan.name.toLowerCase()}`}
                  prefetch={false}
                >
                  {plan.cta}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
