import { setDetailsExpanded } from "@/scripts/features/animations/detailsTransition";

export function initShowMore() {
  const button = document.querySelector<HTMLButtonElement>(".btn");
  if (!button) throw new Error("Toggle button is missing");

  const span = button.querySelector<HTMLSpanElement>(".text");
  if (!span) throw new Error("Toggle button misses .text span");

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    const nextState = !isExpanded;

    span.textContent = nextState ? "less" : "more";
    button.setAttribute("aria-expanded", String(nextState));

    setDetailsExpanded(nextState);
  });

  // Resize
  let resizeTimeout: number;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      setDetailsExpanded(isExpanded);
    }, 150);
  });
}
