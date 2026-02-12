import "./gsap";
import { initGsapDefaults, initScrollTriggerRefresh } from "./global";
import { initInitialLoadingAnimation } from "./initialLoadingAnimation";

export function initAnimations() {
  initGsapDefaults();
  initScrollTriggerRefresh();
  initInitialLoadingAnimation();
}
