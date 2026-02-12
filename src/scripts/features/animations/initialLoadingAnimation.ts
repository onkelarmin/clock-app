import { gsap } from "./gsap";
import { MEDIA } from "./media";
import { GSDevTools } from "./gsap";

export function initInitialLoadingAnimation() {
  // Section
  const main = document.querySelector<HTMLElement>("#main");
  if (!main) return;

  // Match media
  const mm = gsap.matchMedia();
  mm.add(MEDIA, (context) => {
    const { isMobileP, isMobileL, isTablet, isDesktop, reduceMotion } =
      context.conditions ?? {};
    const { isReverted } = context;

    if (isReverted) return;

    const tl = gsap
      .timeline({
        onComplete: () => {
          main.classList.remove("gsap-auto-alpha");
          tl.invalidate();
        },
      })
      .to(main, { autoAlpha: 1, duration: 0.1 })
      .to(".bg-image > *", {
        scale: reduceMotion ? 0 : isDesktop ? 1.07 : 0,
        duration: 3,
        ease: "power1.out",
      })
      .from(
        "#overview-section .content > *",
        {
          y: reduceMotion ? 0 : isDesktop ? 40 : 0,
          opacity: 0,
          filter: "blur(8px)",
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
        },
        "<",
      )
      .from(
        "#overview-section button",
        {
          y: reduceMotion ? 0 : isDesktop ? 40 : 0,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.5,
          ease: "power2.out",
        },
        "<40%",
      )
      .from(
        ".quote-content, .quote-author, .quote-button",
        {
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.5,
          ease: "power2.out",
        },
        "<40%",
      );
  });
}
