import { apiFetchClient } from '@/lib/api-client';
import { triggerStreakCelebration } from '@/components/streak/streak-celebration';
import type { StreakDTO } from '@repo/validators';

/** Registra actividad de estudio completada (un POST por sesión; idempotente el mismo día en backend). */
export async function recordStreakActivity(): Promise<void> {
  try {
    // 1. Obtener la racha antes del registro (si existe)
    let prevStreakValue = 0;
    try {
      const currentStreakData = await apiFetchClient<StreakDTO | null>('/streaks');
      if (currentStreakData) {
        prevStreakValue = currentStreakData.currentStreak;
      }
    } catch (e) {
      console.warn('Could not fetch previous streak, defaulting to 0:', e);
    }

    // 2. Registrar la actividad
    await apiFetchClient('/streaks/activity', { method: 'POST' });

    // 3. Obtener la racha actualizada
    const updatedStreak = await apiFetchClient<StreakDTO | null>('/streaks');
    if (updatedStreak) {
      const isNewStreak = updatedStreak.currentStreak > prevStreakValue;
      
      // Mostrar la pantalla de Duolingo ÚNICAMENTE si la racha avanzó de forma real
      if (isNewStreak) {
        triggerStreakCelebration({
          currentStreak: updatedStreak.currentStreak,
          isNewStreak,
        });
      }
    }
  } catch (err) {
    console.error('Error recording streak activity:', err);
  }
}
