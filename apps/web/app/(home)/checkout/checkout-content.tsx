'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Suspense, useCallback, useEffect, useState } from 'react';

import { ArrowLeft, Loader2, ShieldCheck, Ticket, Zap } from 'lucide-react';
import { motion } from 'motion/react';

import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';

import HeaderCheckout from '@/components/landing/checkout/header-checkout';
import LeftPanelCheckout from '@/components/landing/checkout/left-panel-checkout';
import RightPanelCheckout from '@/components/landing/checkout/right-panel-checkout';
import { apiFetchClient } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-provider';

interface PlanData {
  id: string;
  name: string;
  description: string;
  price: number;
  stripePriceId: string;
  features: string[];
  popular: boolean;
}

function CheckoutInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan');
  const billingCycle = (searchParams.get('billingCycle') as 'monthly' | 'yearly') || 'monthly';

  const [plan, setPlan] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!planParam) {
      setError('No se especificó un plan');
      setLoading(false);
      return;
    }

    const fetchPlan = async () => {
      try {
        const response = await apiFetchClient<PlanData>(`/plans/${planParam}`);
        setPlan(response);
      } catch (err) {
        console.error('Error fetching plan:', err);
        setError('No se pudo cargar la información del plan');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [planParam]);

  const handleCheckout = useCallback(async () => {
    if (!user || !plan) return;

    setCheckoutLoading(true);
    setError(null);

    try {
      const data = await apiFetchClient<{ url: string }>(
        '/checkout/create-session',
        {
          method: 'POST',
          body: JSON.stringify({
            planId: plan.stripePriceId,
          }),
        },
      );

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Error al crear la sesión';
      console.error('Error creating checkout session:', err);
      setError(
        errorMsg || 'Error al crear la sesión de pago. Inténtalo de nuevo.',
      );
    } finally {
      setCheckoutLoading(false);
    }
  }, [user, plan]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6 max-w-sm text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <Loader2 className="w-12 h-12 animate-spin text-primary relative z-10" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <p className="text-xl font-bold tracking-tight">
              Preparando tu checkout
            </p>
            <p className="text-muted-foreground text-sm">
              Estamos verificando los detalles del plan seleccionado...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md mx-auto px-6 bg-card border border-border/50 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-destructive" />
          <div className="w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center mx-auto mb-2 rotate-12">
            <Zap className="w-10 h-10 text-destructive" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight">
              ¡Ups! Algo salió mal
            </h2>
            <p className="text-muted-foreground text-sm">
              {error ||
                'No pudimos encontrar el plan que buscas. Tal vez el enlace ha expirado o no es válido.'}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              asChild
              className="rounded-2xl h-12 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            >
              <Link href="/#pricing">Ver planes disponibles</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-2xl h-12 font-semibold"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const basePrice = plan.price / 100;
  const finalPrice =
    billingCycle === 'yearly' ? basePrice * 0.8 : basePrice;
  const formattedPrice = finalPrice.toFixed(0);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Ultra-subtle background resplendence */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-[0.08] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #3B82F6, transparent)',
        }}
      />

      <div className="relative z-10 memo-container py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Top navigation/logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <HeaderCheckout />
            <div className="hidden md:flex items-center gap-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Pago 100%
                Seguro
              </span>
              <div className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5 text-primary" /> Sin comisiones
              </span>
            </div>
          </motion.div>

          <header className="text-center mb-4 space-y-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge
                variant="outline"
                className="rounded-full px-3 py-0.5 border-primary/20 bg-primary/5 text-primary text-[9px] uppercase font-bold tracking-widest mb-2"
              >
                Paso Final
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-black tracking-tight"
            >
              Mejora tu{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">
                aprendizaje
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-xs md:text-sm max-w-lg mx-auto"
            >
              Domina nuevos temas un 2x más rápido con {plan.name}.
            </motion.p>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 100,
              delay: 0.4,
            }}
            className="group relative"
          >
            {/* Main Outer Card Shadow/Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-blue-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 pointer-events-none" />

            {/* Main Card */}
            <div className="relative rounded-3xl border border-border/40 overflow-hidden shadow-2xl bg-card/80 backdrop-blur-xl transition-all duration-500 hover:border-primary/20">
              <div className="grid md:grid-cols-2 divide-x divide-border/20">
                {/* LEFT: Plan details */}
                <LeftPanelCheckout
                  plan={plan}
                  formattedPrice={formattedPrice}
                  billingCycle={billingCycle}
                />

                {/* RIGHT: Payment section */}
                <RightPanelCheckout
                  user={user}
                  planName={plan.name}
                  formattedPrice={formattedPrice}
                  billingCycle={billingCycle}
                  checkoutLoading={checkoutLoading}
                  error={error}
                  handleCheckout={handleCheckout}
                />
              </div>
            </div>
          </motion.div>

          {/* Bottom Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
              Trusted by 10k+ Learners
            </span>
            <div className="flex gap-6 items-center">
              <div className="h-6 w-20 bg-muted/50 rounded-md animate-pulse" />
              <div className="h-6 w-24 bg-muted/50 rounded-md animate-pulse" />
              <div className="h-6 w-16 bg-muted/50 rounded-md animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutContent() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center p-6 grayscale opacity-20 transition-all">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
            <Loader2 className="w-12 h-12 animate-spin text-primary relative z-10" />
          </div>
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
