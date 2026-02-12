export function formatTime(timestamp: number, timezone: string) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: timezone,
  });

  return formatter.format(timestamp);
}
