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
      console.log("Forwarded: ", forwardedFor);

      const ip = forwardedFor?.split(",")[0].trim();
      console.log(ip);

      const res = await fetch(`https://time.now/developer/api/ip/${ip}`);

      if (!res.ok) {
        throw new Error("Upstream service failed");
      }

      return res.json();
    },
  }),
};
