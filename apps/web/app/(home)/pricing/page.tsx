import { type Metadata } from 'next';

import PricingPageContent from '@/components/landing/pricing-section';

export const metadata: Metadata = {
  title: 'Planes y Precios — memo.ai',
  description:
    'Compara todos los planes de memo.ai. Empieza gratis y escala cuando lo necesites. Almacenamiento ilimitado, IA avanzada y más en el plan Pro.',
};

export default function PricingPage() {
  return <PricingPageContent />;
}
