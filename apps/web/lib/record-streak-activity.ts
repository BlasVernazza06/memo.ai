import { apiFetchClient } from '@/lib/api-client';

/** Registra actividad de estudio completada (un POST por sesión; idempotente el mismo día en backend). */
export function recordStreakActivity(): void {
  apiFetchClient('/streaks/activity', { method: 'POST' }).catch((err) =>
    console.error('Error recording streak activity:', err),
  );
}
