import { actions } from "astro:actions";
import { deriveTimeState, type TimeState } from "@/lib/deriveTimeState";
import { formatTime } from "@/lib/formatTime";

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

  // Initial State
  const getInitialState = (): TimeState => {
    const timeStateScript = document.querySelector("#time-state");

    if (!timeStateScript) throw new Error("Missing serialized time state");

    const parsed = JSON.parse(timeStateScript.textContent);

    return parsed;
  };

  let timeState = getInitialState();

  // Load data
  const loadData = async () => {
    const { data, error } = await actions.getTime();

    if (error) {
      console.error("Action failed:", error.message);
      return;
    }

    if (data) {
      timeState = deriveTimeState(data);
    }

    renderData();
  };

  // Render data
  const renderData = () => {
    const date = new Date(timeState.timestamp);

    root.dataset.theme = timeState.dayTime === "day" ? "light" : "dark";
    bgImage.dataset.theme = timeState.dayTime;

    overviewIcon.dataset.theme = timeState.dayTime;
    overviewGreeting.textContent = `Good ${timeState.greeting}`;
    overviewTime.textContent = formatTime(
      timeState.timestamp,
      timeState.timezone,
    );
    overviewTime.setAttribute("datetime", date.toISOString());
    overviewTimezone.textContent = timeState.timezoneShort;
    overviewLocation.textContent = `in ${timeState.city}, ${timeState.continent}`;

    detailsTimezone.textContent = `${timeState.continent}/${timeState.city}`;
    detailsDayOfTheYear.textContent = timeState.dayOfYear;
    detailsDayOfTheWeek.textContent = timeState.dayOfWeek;
    detailsWeekNumber.textContent = timeState.weekNumber;
  };

  // Render Time only
  const renderTimeOnly = () => {
    overviewTime.textContent = formatTime(
      timeState.timestamp,
      timeState.timezone,
    );
  };

  loadData();

  // Tick
  setInterval(() => {
    timeState.timestamp += 1000;
    const date = new Date(timeState.timestamp);

    const newHour = date.getHours();
    const newMin = date.getMinutes();

    if (timeState.hour !== newHour) {
      timeState.hour = newHour;
      loadData();
    }
    if (timeState.min !== newMin) {
      renderTimeOnly();
      timeState.min = newMin;
    }
  }, 1000);
}
