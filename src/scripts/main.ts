import { initAnimations } from "@scripts/features/animations";
import { initShowMore } from "./features/showMore";
import { initDisplayQuote } from "./features/quote/displayQuote";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initShowMore();
  initDisplayQuote();
});
