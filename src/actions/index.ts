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
      const forwardedFor = context.request.headers.get("x-forwarded-for");

      const ip = forwardedFor?.split(",")[0].trim();

      const url = ip
        ? `https://time.now/developer/api/ip/${ip}`
        : "https://time.now/developer/api/ip";

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Upstream service failed");
      }

      return res.json();
    },
  }),
};
