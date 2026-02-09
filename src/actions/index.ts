import { defineAction } from "astro:actions";

export const server = {
  getQuote: defineAction({
    handler: async () => {
      const res = await fetch("https://zenquotes.io/api/random");

      if (!res.ok) {
        throw new Error("Upstream service failed");
      }

      return res.json();
    },
  }),
};
