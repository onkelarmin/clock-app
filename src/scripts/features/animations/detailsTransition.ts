import { cssTime } from "@/lib/helper";
import { gsap, Flip } from "./gsap";
import { MEDIA } from "./media";

let expanded = false;
let reduceMotion = false;

const detailsSection = document.querySelector<HTMLElement>("#details-section");
const overviewSection =
  document.querySelector<HTMLElement>("#overview-section");
const quoteSection = document.querySelector<HTMLElement>("#quote-section");

// Match media
const mm = gsap.matchMedia();
mm.add(MEDIA, (context) => {
  reduceMotion = context.conditions?.reduceMotion ?? false;

  runAnimation();
});

function runAnimation() {
  if (!detailsSection || !overviewSection || !quoteSection) return;

  // Flip state
  const state = Flip.getState([overviewSection, quoteSection]);

  // Dom changes
  detailsSection?.toggleAttribute("inert", !expanded);
  quoteSection?.toggleAttribute("hidden", expanded);

  // Animation
  const tl = gsap.timeline();

  tl.add(
    Flip.from(state, {
      absolute: true,
      ease: "power2.inOut",
      duration: reduceMotion ? 0 : cssTime("--motion-slow"),
      onLeave: (elements) => {
        gsap.to(elements, { opacity: 0 });
      },
      onEnter: (elements) => {
        gsap.to(elements, { opacity: 1, delay: reduceMotion ? 0 : 0.2 });
      },
    }),
  ).to(
    detailsSection,
    {
      yPercent: !expanded ? 0 : -100,
      opacity: 1,
      duration: reduceMotion ? 0 : cssTime("--motion-slow"),
      ease: "power2.inOut",
    },
    "<",
  );
}

// Public API
export function setDetailsExpanded(value: boolean) {
  if (value === expanded) return;

  expanded = value;
  runAnimation();
}
