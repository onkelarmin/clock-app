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
  getTime: defineAction({
    handler: async (_, context) => {
      console.log(context.request.headers);

      const res = await fetch("https://time.now/developer/api/ip");

      if (!res.ok) {
        throw new Error("Upstream service failed");
      }

      return res.json();
    },
  }),
};
