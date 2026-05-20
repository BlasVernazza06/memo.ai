import type { StreakDTO } from '@repo/validators';

export type StreakTimelineDay = {
  label: string;
  active: boolean;
  today: boolean;
};

const DAY_LABELS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'] as const;
const TIMELINE_LENGTH = 7;

function startOfCalendarDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addCalendarDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return startOfCalendarDay(next);
}

function parseLastActivity(
  value: StreakDTO['lastActivity'],
): Date | null {
  if (value == null) return null;
  const parsed = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(parsed.getTime())) return null;
  return startOfCalendarDay(parsed);
}

function buildEmptyTimeline(today: Date): StreakTimelineDay[] {
  const windowStart = addCalendarDays(today, -(TIMELINE_LENGTH - 1));
  return Array.from({ length: TIMELINE_LENGTH }, (_, i) => {
    const date = addCalendarDays(windowStart, i);
    return {
      label: DAY_LABELS[date.getDay()],
      active: false,
      today: date.getTime() === today.getTime(),
    };
  });
}

/**
 * Ventana de 7 días anclada al inicio de la racha actual (consecutiva).
 * Si la racha supera 7 días, muestra los últimos 7 hasta lastActivity.
 * Sin racha activa: últimos 7 días calendario, todos inactivos.
 */
export function buildStreakTimeline(streak: StreakDTO | null): StreakTimelineDay[] {
  const today = startOfCalendarDay(new Date());

  if (!streak || streak.currentStreak <= 0) {
    return buildEmptyTimeline(today);
  }

  const lastActivity = parseLastActivity(streak.lastActivity);
  if (!lastActivity) {
    return buildEmptyTimeline(today);
  }

  const streakStart = addCalendarDays(
    lastActivity,
    -(streak.currentStreak - 1),
  );

  const windowStart =
    streak.currentStreak > TIMELINE_LENGTH
      ? addCalendarDays(lastActivity, -(TIMELINE_LENGTH - 1))
      : streakStart;

  return Array.from({ length: TIMELINE_LENGTH }, (_, i) => {
    const date = addCalendarDays(windowStart, i);
    const active =
      date.getTime() >= streakStart.getTime() &&
      date.getTime() <= lastActivity.getTime();

    return {
      label: DAY_LABELS[date.getDay()],
      active,
      today: date.getTime() === today.getTime(),
    };
  });
}

export function getStreakProgressPercent(days: StreakTimelineDay[]): number {
  const activeCount = days.filter((day) => day.active).length;
  if (activeCount === 0) return 0;
  return Math.round((activeCount / days.length) * 100);
}
