import { LucideIcon, Sparkles, Zap } from 'lucide-react';

export interface Plan {
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

export const PLAN_FEATURES: Record<string, string[]> = {
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

export const comparisonFeatures = [
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

export const faqs = [
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
