'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@repo/ui/components/ui/button';
import { useAuth } from '@/lib/auth-provider';
import { apiFetchClient } from '@/lib/api-client';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  stripePriceId: string;
  features: string[];
}

const featureDescriptions: Record<string, string> = {
  'Hasta 3 workspaces': 'Crea bibliotecas independientes para organizar tus estudios.',
  'Generación básica de flashcards': 'Genera tarjetas de memoria para repasar conceptos clave.',
  'Roadmaps de estudio estándar': 'Guías secuenciales de aprendizaje predefinidas.',
  'Soporte comunitario': 'Ayuda y resolución de dudas mediante foros públicos.',
  'Workspaces ilimitados': 'Crea todos los espacios que necesites sin restricciones.',
  'Flashcards avanzadas con IA': 'Aprovecha la IA para crear decks predictivos y avanzados.',
  'Quizzes personalizados infinitos': 'Tests de repaso dinámicos basados en tu contenido.',
  'Exportación a Anki': 'Sincroniza tus repasos con la plataforma líder.',
  'Soporte prioritario 24/7': 'Atención rápida y canal de Discord exclusivo.',
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
          setPlans(response);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >


      <div className={`relative overflow-hidden bg-card border rounded-4xl p-8 transition-all duration-300 ${isPro ? 'border-primary/25 shadow-[0_12px_40px_rgba(var(--primary),0.05)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.2)]' : 'border-border/80 shadow-md'}`}>
        {isPro && (
          <div className="absolute top-0 right-0 w-80 h-full bg-linear-to-l from-primary/10 via-primary/3 to-transparent pointer-events-none" />
        )}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] ${isPro ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted border-border/60 text-muted-foreground'}`}>
              <Sparkles className="w-3 h-3" />
              Plan Actual: {isPro ? 'PRO' : 'GRATUITO'}
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold italic tracking-tight text-foreground">
                {isPro ? 'Memo Unlimited' : 'Memo Starter'}
              </h3>
              <p className="text-muted-foreground text-sm font-medium opacity-80">
                {isPro ? 'Próximo cobro: $9.99 el 12 de Marzo, 2026' : 'Funciones básicas activas'}
              </p>
            </div>
          </div>
          <Button className={`font-bold rounded-xl px-6 h-12 shadow-lg transition-all active:scale-95 cursor-pointer ${isPro ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20' : 'bg-foreground text-background hover:opacity-90'}`}>
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
              className={`p-6 bg-card border rounded-3xl transition-all duration-300 flex flex-col gap-3 group peer cursor-default ${isPro ? 'border-border/60 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)]' : 'border-border/40 hover:border-border/80'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${isPro ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-foreground">
                  {feature}
                </p>
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
              ¿Listo para estudiar de forma inteligente? El plan PRO te brinda acceso a resúmenes profundos sin límites.
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-2xl h-12 px-8 shadow-lg shadow-primary/30 text-base">
            Activar Pro ahora
          </Button>
        </div>
      )}
    </motion.div>
  );
}
