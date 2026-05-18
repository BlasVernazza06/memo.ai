import { LucideIcon } from 'lucide-react';

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
