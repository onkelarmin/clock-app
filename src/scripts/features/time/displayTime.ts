import { actions } from "astro:actions";

export async function initDisplayTime() {
  const root = document.documentElement;
  const bgImage = document.querySelector<HTMLElement>(".bg-image");

  const overviewSection =
    document.querySelector<HTMLElement>("#overview-section");
  const overviewIcon = overviewSection?.querySelector<HTMLElement>(".icon");
  const overviewGreeting =
    overviewSection?.querySelector<HTMLSpanElement>(".greeting");
  const overviewTime = overviewSection?.querySelector<HTMLTimeElement>(".time");
  const overviewTimezone =
    overviewSection?.querySelector<HTMLSpanElement>(".timezone");
  const overviewLocation =
    overviewSection?.querySelector<HTMLParagraphElement>(".location");

  const detailsSection =
    document.querySelector<HTMLElement>("#details-section");
  const detailsTimezone =
    detailsSection?.querySelector<HTMLElement>(".timezone dd");
  const detailsDayOfTheYear = detailsSection?.querySelector<HTMLElement>(
    ".day-of-the-year dd",
  );
  const detailsDayOfTheWeek = detailsSection?.querySelector<HTMLElement>(
    ".day-of-the-week dd",
  );
  const detailsWeekNumber =
    detailsSection?.querySelector<HTMLElement>(".week-number dd");

  if (
    !bgImage ||
    !overviewSection ||
    !overviewIcon ||
    !overviewGreeting ||
    !overviewTime ||
    !overviewTimezone ||
    !overviewLocation ||
    !detailsTimezone ||
    !detailsDayOfTheYear ||
    !detailsDayOfTheWeek ||
    !detailsWeekNumber
  )
    throw new Error("DOM structure missing");

  // State
  const state = {
    timestamp: 0,
    hour: 0,
    min: 0,
    continent: "",
    city: "",
    timezoneShort: "",
    dayOfWeek: "",
    dayOfYear: "",
    weekNumber: "",
  };

  const loadData = async () => {
    const { data, error } = await actions.getTime();

    if (error) {
      console.error("Action failed:", error.message);
      return;
    }

    if (data) {
      const {
        abbreviation,
        datetime,
        day_of_week,
        day_of_year,
        timezone,
        week_number,
      } = data;

      const date = new Date(datetime);
      state.timestamp = date.getTime();
      state.hour = date.getHours();
      state.min = date.getMinutes();

      const split = timezone.split("/");
      state.continent = split[0] ?? "";
      state.city = split[1] ?? "";
      state.timezoneShort = abbreviation;
      state.dayOfWeek = String(day_of_week);
      state.dayOfYear = String(day_of_year);
      state.weekNumber = String(week_number);
    }

    renderData();
  };

  const renderData = () => {
    if (state.timestamp === 0) return;

    const date = new Date(state.timestamp);
    const greeting = getGreeting(state.hour);

    const dayTime = getDayTime(state.hour);

    root.dataset.theme = dayTime === "day" ? "light" : "dark";
    bgImage.dataset.theme = dayTime;

    overviewIcon.dataset.theme = dayTime;
    overviewGreeting.textContent = `Good ${greeting}`;
    overviewTime.textContent = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    overviewTime.setAttribute("datetime", date.toISOString());
    overviewTimezone.textContent = state.timezoneShort;
    overviewLocation.textContent = `in ${state.city}, ${state.continent}`;

    detailsTimezone.textContent = `${state.continent}/${state.city}`;
    detailsDayOfTheYear.textContent = state.dayOfYear;
    detailsDayOfTheWeek.textContent = state.dayOfWeek;
    detailsWeekNumber.textContent = state.weekNumber;
  };

  const renderTimeOnly = (date: Date) => {
    state.min = date.getMinutes();

    overviewTime.textContent = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const getGreeting = (hour: number) => {
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    return "evening";
  };

  const getDayTime = (hour: number) => {
    if (hour >= 5 && hour < 18) return "day";
    return "night";
  };

  loadData();

  setInterval(() => {
    state.timestamp += 1000;
    const date = new Date(state.timestamp);

    const newHour = date.getHours();
    const newMin = date.getMinutes();

    if (state.hour !== newHour) {
      state.hour = newHour;
      loadData();
    }
    if (state.min !== newMin) {
      renderTimeOnly(date);
      state.min = newMin;
    }
  }, 1000);
}
