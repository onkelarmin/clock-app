import { initAnimations } from "@scripts/features/animations";
import { initShowMore } from "./features/showMore";
import { initDisplayQuote } from "./features/quote/displayQuote";
import { initDisplayTime } from "./features/time/displayTime";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initShowMore();
  initDisplayQuote();
  // initDisplayTime();
});
