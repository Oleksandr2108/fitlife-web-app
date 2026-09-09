const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addCalendarDays(date: Date, days: number): Date {
  const result = startOfLocalDay(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function startOfLocalWeek(date: Date): Date {
  const day = startOfLocalDay(date);
  const mondayOffset = (day.getDay() + 6) % 7;
  return addCalendarDays(day, -mondayOffset);
}

export function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isValidDate(date: Date): boolean {
  return Number.isFinite(date.getTime());
}

export function differenceInCalendarDays(later: Date, earlier: Date): number {
  const laterUtc = Date.UTC(
    later.getFullYear(),
    later.getMonth(),
    later.getDate(),
  );
  const earlierUtc = Date.UTC(
    earlier.getFullYear(),
    earlier.getMonth(),
    earlier.getDate(),
  );
  return Math.round((laterUtc - earlierUtc) / DAY_IN_MILLISECONDS);
}

export function formatActivityDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatRecentActivityDate(
  value: string,
  now = new Date(),
): string {
  const date = new Date(value);
  if (!isValidDate(date)) return "Date unavailable";
  const difference = differenceInCalendarDays(
    startOfLocalDay(now),
    startOfLocalDay(date),
  );
  if (difference === 0) return "Today";
  if (difference === 1) return "Yesterday";
  return formatActivityDate(date);
}
