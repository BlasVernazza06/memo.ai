import { type LucideIcon } from 'lucide-react';
import { cacheLife } from 'next/cache';
import { apiFetch } from './api-fetch';

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

export async function getCachedPlans(): Promise<Plan[]> {
  'use cache';
  cacheLife('hours'); // Plans don't change often
  
  try {
    const plans = await apiFetch<Plan[]>('/plans', { skipCookies: true });
    return plans;
  } catch (error) {
    console.error('Error fetching plans for cache:', error);
    return [];
  }
}
