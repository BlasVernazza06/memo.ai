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

export function buildStreakTimeline(streak: StreakDTO | null): StreakTimelineDay[] {
  const today = startOfCalendarDay(new Date());

  // Define active range if streak is active
  let streakStart: number | null = null;
  let lastActivity: number | null = null;

  if (streak && streak.currentStreak > 0) {
    const parsedLast = parseLastActivity(streak.lastActivity);
    if (parsedLast) {
      lastActivity = parsedLast.getTime();
      streakStart = addCalendarDays(parsedLast, -(streak.currentStreak - 1)).getTime();
    }
  }

  return Array.from({ length: TIMELINE_LENGTH }, (_, i) => {
    const date = addCalendarDays(today, -i); // Go backwards from today
    const time = date.getTime();

    const active =
      streakStart !== null &&
      lastActivity !== null &&
      time >= streakStart &&
      time <= lastActivity;

    return {
      label: DAY_LABELS[date.getDay()] ?? 'Do',
      active,
      today: time === today.getTime(),
    };
  });
}

export function getStreakProgressPercent(days: StreakTimelineDay[]): number {
  const activeCount = days.filter((day) => day.active).length;
  if (activeCount === 0) return 0;
  return Math.round((activeCount / days.length) * 100);
}
