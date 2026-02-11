// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://fm-smart-clock-app.netlify.app/",

  image: {
    responsiveStyles: true,
    layout: "constrained",
  },

  devToolbar: {
    enabled: false,
  },

  adapter: netlify(),
});
