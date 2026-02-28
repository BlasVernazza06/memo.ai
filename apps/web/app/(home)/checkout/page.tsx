'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Suspense, useCallback, useEffect, useState } from 'react';

import { Loader2, Zap } from 'lucide-react';

import { Button } from '@repo/ui/components/ui/button';

import HeaderCheckout from '@/components/landing/checkout/header-checkout';
import LeftPanelCheckout from '@/components/landing/checkout/left-panel-checkout';
import RightPanelCheckout from '@/components/landing/checkout/right-panel-checkout';
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

function CheckoutContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const planParam = searchParams.get('plan');

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
        const response = await fetch(`/api/payments/plan/${planParam}`);
        if (!response.ok) throw new Error('Plan no encontrado');
        const data = await response.json();
        setPlan(data);
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
    if (!user || !planParam) return;

    setCheckoutLoading(true);
    try {
      const response = await fetch(`/api/payments/checkout/${planParam}`);

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      router.push(data.url);
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError('Error al crear la sesión de pago. Inténtalo de nuevo.');
      setCheckoutLoading(false);
    }
  }, [user, planParam, router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">
            Cargando información del plan...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <Zap className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-bold">{error || 'Plan no encontrado'}</h2>
          <p className="text-muted-foreground text-sm">
            Verifica el enlace o vuelve a la página de precios.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/#pricing">Volver a Planes</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formattedPrice = (plan.price / 100).toFixed(0);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: 'hsla(199, 89%, 48%, 0.12)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"
        style={{ background: 'hsla(217, 91%, 60%, 0.12)' }}
      />

      {/* Header */}
      <HeaderCheckout />

      {/* Main content */}
      <div className="relative z-10 memo-container py-8 md:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Finaliza tu suscripción
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Estás a un paso de desbloquear todo el potencial de memo.ai
            </p>
          </div>

          {/* Two-column card */}
          <div className="rounded-3xl border border-border/60 overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/20 bg-card">
            <div className="grid md:grid-cols-2">
              {/* LEFT: Plan details */}
              <LeftPanelCheckout plan={plan} formattedPrice={formattedPrice} />

              {/* RIGHT: Payment section */}
              <RightPanelCheckout
                user={user}
                planName={plan.name}
                formattedPrice={formattedPrice}
                checkoutLoading={checkoutLoading}
                error={error}
                handleCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
