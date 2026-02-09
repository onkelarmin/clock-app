import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import GSDevTools from "gsap/GSDevTools";
import { Flip } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);
gsap.registerPlugin(GSDevTools);

export { gsap, ScrollTrigger, GSDevTools, Flip };
