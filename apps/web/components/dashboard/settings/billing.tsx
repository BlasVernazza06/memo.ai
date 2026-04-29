'use client';

import { useEffect, useState } from 'react';

import { CheckCircle2, Sparkles } from 'lucide-react';
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
}

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

const featureDescriptions: Record<string, string> = {
  '3 workspaces': 'Crea hasta 3 bibliotecas independientes.',
  'Carga de archivos hasta 5 MB':
    'Ideal para documentos de texto y PDFs ligeros.',
  '20 resúmenes con IA / mes': 'Análisis automático de tus documentos.',
  '10 quizzes generados / mes': 'Pon a prueba tus conocimientos.',
  '50 flashcards automáticas / mes': 'Repaso espaciado inteligente.',
  'Soporte por email': 'Resolución de dudas en 24-48h.',
  'Workspaces ilimitados': 'Sin límites para tu organización.',
  'Carga de archivos hasta 100 MB': 'Sube libros y documentos pesados.',
  'Resúmenes con IA ilimitados': 'Sin restricciones de análisis.',
  'Quizzes ilimitados': 'Tests infinitos sobre tu contenido.',
  'Flashcards ilimitadas': 'Crea todos los mazos que necesites.',
  'Soporte prioritario': 'Atención rápida y preferencial.',
  'Acceso anticipado a nuevas features': 'Prueba lo último antes que nadie.',
};

export default function Billing() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiFetchClient<Plan[]>('/plans');
        if (Array.isArray(response)) {
          const mappedPlans = response.map((p) => ({
            ...p,
            price: p.price / 100,
            features: PLAN_FEATURES[p.id] || p.features,
          }));
          setPlans(mappedPlans);
        }
      } catch (error) {
        console.error('Error fetching plans in billing:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const isPro = user?.plan === 'pro';
  const currentPlan = plans.find((p) => p.id === (user?.plan || 'free'));
  const features = currentPlan?.features || [];
  const displayPrice = currentPlan?.price ?? 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div
        className={`relative overflow-hidden bg-card border rounded-4xl p-8 ${isPro ? 'border-primary/25' : 'border-border/80'}`}
      >
        {isPro && (
          <div className="absolute top-0 right-0 w-80 h-full bg-linear-to-l from-primary/10 via-primary/3 to-transparent pointer-events-none" />
        )}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] ${isPro ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted border-border/60 text-muted-foreground'}`}
            >
              <Sparkles className="w-3 h-3" />
              Plan Actual: {isPro ? 'PRO' : 'GRATUITO'}
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold italic tracking-tight text-foreground">
                {isPro ? 'Memo Unlimited' : 'Memo Starter'}
              </h3>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                {isPro
                  ? `Plan activo: $${displayPrice.toFixed(0)}/mes`
                  : 'Funciones básicas activas'}
              </p>
            </div>
          </div>
          <Button
            className={`font-bold rounded-xl px-6 h-12 transition-all active:scale-95 cursor-pointer ${isPro ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-foreground text-background hover:opacity-90'}`}
          >
            {isPro ? 'Gestionar Facturación' : 'Mejorar a PRO'}
          </Button>
        </div>
      </div>

      <div className="pt-4">
        <h4 className="text-xs font-black text-foreground/80 uppercase tracking-wider mb-5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          Características de tu plan
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`p-6 bg-card border rounded-3xl flex flex-col gap-3 group peer cursor-default transition-[border-color] duration-300 ${isPro ? 'border-border/60 hover:border-primary/30' : 'border-border/40 hover:border-border/80'}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${isPro ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-foreground">{feature}</p>
                {featureDescriptions[feature] && (
                  <p className="text-xs text-muted-foreground font-medium opacity-80 mt-1">
                    {featureDescriptions[feature]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isPro && (
        <div className="bg-linear-to-r from-primary/10 via-primary/3 to-transparent border-2 border-primary/15 rounded-4xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 mt-4">
          <div className="space-y-2">
            <h4 className="text-lg font-black text-foreground italic flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Desbloquea el potencial máximo
            </h4>
            <p className="text-sm text-muted-foreground font-medium max-w-md">
              ¿Listo para estudiar de forma inteligente? El plan PRO te brinda
              acceso a resúmenes profundos sin límites.
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-2xl h-12 px-8 text-base">
            Activar Pro ahora
          </Button>
        </div>
      )}
    </div>
  );
}
