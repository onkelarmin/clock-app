export type PageKey = "home";

export interface PageData {
  key: PageKey;
  name: string;
  url: string;
  title: string;
  description: string;
  ogImage: string;
}

export const sitePages: Record<PageKey, PageData> = {
  home: {
    key: "home",
    name: "Home",
    url: "/",
    title: "Smart World Clock",
    description:
      "An interactive clock app that shows your local time and location, adapts its greeting and visuals to the time of day, and delivers a daily dose of inspiration through random quotes.",
    ogImage: "og/home.jpg",
  },
};
