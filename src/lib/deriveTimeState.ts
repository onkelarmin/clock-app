export type TimeApiData = {
  abbreviation: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  timezone: string;
  week_number: number;
};

export type TimeState = {
  timestamp: number;
  hour: number;
  min: number;
  continent: string;
  city: string;
  timezone: string;
  timezoneShort: string;
  dayOfWeek: string;
  dayOfYear: string;
  weekNumber: string;
  greeting: string;
  dayTime: string;
};

export function deriveTimeState(data: TimeApiData): TimeState {
  const date = new Date(data.datetime);
  console.log("Date: ", date);
  const timestamp = date.getTime();
  const timezone = data.timezone;

  const hourFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    hour12: false,
    timeZone: timezone,
  });
  const minFormatter = new Intl.DateTimeFormat(undefined, {
    minute: "numeric",
    hour12: false,
    timeZone: timezone,
  });

  const hour = Number(hourFormatter.format(date));
  const min = Number(minFormatter.format(date));

  const split = timezone.split("/");
  const continent = split[0].replaceAll("_", " ") ?? "";
  const city = split[1].replaceAll("_", " ") ?? "";
  const timezoneShort = data.abbreviation;
  const dayOfWeek = String(data.day_of_week);
  const dayOfYear = String(data.day_of_year);
  const weekNumber = String(data.week_number);

  const greeting = getGreeting(hour);
  const dayTime = getDayTime(hour);

  return {
    timestamp,
    hour,
    min,
    continent,
    city,
    timezone,
    timezoneShort,
    dayOfWeek,
    dayOfYear,
    weekNumber,
    greeting,
    dayTime,
  };
}

const getGreeting = (hour: number) => {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "evening";
};

const getDayTime = (hour: number) => {
  if (hour >= 5 && hour < 18) return "day";
  return "night";
};
