'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import {
  ArrowLeft,
  Check,
  type LucideIcon,
  Minus,
  ShieldCheck,
  Sparkles,
  Star,
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

// Static feature lists — source of truth for what the app actually offers
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

const comparisonFeatures = [
  {
    category: 'Documentos y almacenamiento',
    features: [
      { name: 'Workspaces', free: '3', pro: 'Ilimitados' },
      { name: 'Carga de archivos (máx.)', free: '5 MB', pro: '100 MB' },
    ],
  },
  {
    category: 'Inteligencia Artificial',
    features: [
      { name: 'Resúmenes con IA', free: '20/mes', pro: 'Ilimitados' },
      { name: 'Quiz generados por IA', free: '10/mes', pro: 'Ilimitados' },
      { name: 'Flashcards automáticas', free: '50/mes', pro: 'Ilimitadas' },
    ],
  },
  {
    category: 'Soporte',
    features: [
      { name: 'Soporte por email', free: true, pro: true },
      { name: 'Soporte prioritario', free: false, pro: true },
      { name: 'Acceso anticipado a nuevas features', free: false, pro: true },
    ],
  },
];

const faqs = [
  {
    q: '¿Puedo cambiar de plan en cualquier momento?',
    a: 'Sí. Puedes upgradear a Pro en cualquier momento y el cobro se prorrateará. Si decides cancelar, mantienes el acceso Pro hasta el final del período pagado.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express) a través de Stripe, el procesador de pagos más seguro del mundo.',
  },
  {
    q: '¿Hay un período de prueba para el plan Pro?',
    a: 'El plan Free te permite explorar memo.ai sin límite de tiempo. Si quieres acceder a las funciones Pro, puedes suscribirte en cualquier momento.',
  },
  {
    q: '¿Qué pasa con mis datos si cancelo?',
    a: 'Tus datos permanecen seguros en nuestros servidores. Al cancelar vuelves al plan Free con sus límites, pero nunca eliminamos tu información.',
  },
];

function FeatureCell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <div className="flex justify-center">
        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
          <Check className="w-3 h-3 text-primary" />
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <Minus className="w-4 h-4 text-border" />
      </div>
    );
  }
  return (
    <span className="text-sm font-medium text-center block text-foreground/80">
      {value}
    </span>
  );
}

export default function PricingPageContent() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly',
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="memo-container flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Volver al inicio
          </Link>
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-base font-bold tracking-tight">
              memo<span className="text-primary">.ai</span>
            </span>
          </Link>
          <div className="w-28" />
        </div>
      </div>

      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/[0.05] blur-[120px] rounded-full" />
          </div>

          <div className="memo-container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    Planes y precios
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                Elige el plan que{' '}
                <span className="memo-gradient-text">impulsa tu aprendizaje</span>
              </h1>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                Empieza gratis sin tarjeta de crédito. Escala a Pro cuando
                necesites más potencia.
              </p>
            </motion.div>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-4 mt-10"
            >
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
                  className="px-3 py-1 rounded-full bg-foreground text-background text-[10px] font-black uppercase tracking-widest shadow-xl"
                >
                  Ahorra un 20%
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Plan Cards */}
        <section className="pb-16">
          <div className="memo-container">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : (
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
                        ? `/checkout?plan=${plan.stripePriceId}&billingCycle=${billingCycle}`
                        : '/dashboard';

                  return (
                    <motion.div
                      key={plan.name}
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
                          <h2 className="text-2xl font-black tracking-tight">
                            {plan.name}
                          </h2>
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
            )}
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 border-t border-border/40">
          <div className="memo-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                Comparación detallada
              </h2>
              <p className="text-muted-foreground font-light">
                Todo lo que incluye cada plan, sin letra pequeña.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto px-4">
              {/* Table Header */}
              <div className="grid grid-cols-3 mb-4 px-4">
                <div />
                <div className="text-center">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Free
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Pro
                  </span>
                </div>
              </div>

              <div className="space-y-8">
                {comparisonFeatures.map((section, si) => (
                  <motion.div
                    key={section.category}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: si * 0.08 }}
                  >
                    <div className="px-4 py-2 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground/60">
                        {section.category}
                      </span>
                    </div>
                    <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/50">
                      {section.features.map((feat, fi) => (
                        <div
                          key={feat.name}
                          className={`grid grid-cols-3 items-center px-5 py-4 ${fi !== section.features.length - 1 ? 'border-b border-border/30' : ''} hover:bg-muted/30 transition-colors`}
                        >
                          <span className="text-sm font-medium text-foreground/80 pr-4">
                            {feat.name}
                          </span>
                          <FeatureCell value={feat.free} />
                          <FeatureCell value={feat.pro} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial / Social Proof Strip */}
        <section className="py-16 bg-muted/30 border-y border-border/30">
          <div className="memo-container text-center">
            <div className="flex items-center justify-center gap-1.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-primary text-primary"
                />
              ))}
            </div>
            <p className="text-lg font-semibold tracking-tight max-w-lg mx-auto">
              &ldquo;Desde que uso el plan Pro mis notas están 10x más
              organizadas. La IA no falla.&rdquo;
            </p>
            <p className="text-sm text-muted-foreground mt-3 font-medium">
              — María G., estudiante de Medicina
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="memo-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                Preguntas frecuentes
              </h2>
              <p className="text-muted-foreground font-light">
                Si tienes más dudas,{' '}
                <a
                  href="mailto:support@memo.ai"
                  className="text-primary underline underline-offset-2"
                >
                  escríbenos
                </a>
                .
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto px-4 space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-semibold text-sm pr-4">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-muted-foreground text-lg shrink-0"
                    >
                      +
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === i ? 'auto' : 0,
                      opacity: openFaq === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <section className="py-20 border-t border-border/30">
          <div className="memo-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Listo para empezar?
              </h2>
              <p className="text-muted-foreground font-light">
                No necesitas tarjeta de crédito para el plan Free.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Button asChild size="lg" className="rounded-xl font-bold px-8">
                  <Link href="/auth/sign-up">Empezar gratis</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl font-bold px-8"
                >
                  <Link href="/#features">Ver características</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
