import { Metadata } from 'next';
import CheckoutContent from './checkout-content';

export const metadata: Metadata = {
  title: 'Finaliza tu suscripción | memo.ai',
  description: 'Estás a un paso de desbloquear todo el potencial de tu aprendizaje con el plan Pro de memo.ai.',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
