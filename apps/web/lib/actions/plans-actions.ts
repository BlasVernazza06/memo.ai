import { cacheLife } from 'next/cache';

import { apiFetch } from '@/lib/api-fetch';
import { Plan } from '@/types/plans';

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
