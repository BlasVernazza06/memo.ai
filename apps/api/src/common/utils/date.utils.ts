export function getDifferenceInCalendarDays(dateA: Date, dateB: Date): number {
  const midnightA = new Date(
    dateA.getFullYear(),
    dateA.getMonth(),
    dateA.getDate(),
  ).getTime();
  const midnightB = new Date(
    dateB.getFullYear(),
    dateB.getMonth(),
    dateB.getDate(),
  ).getTime();
  const diffMs = midnightA - midnightB;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}
