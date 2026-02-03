// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [icon()],
  site: "https://fm-recipe-finder-website.netlify.app/",
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  // devToolbar: {
  //   enabled: false,
  // },
});
