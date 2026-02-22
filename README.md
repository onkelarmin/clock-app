# Clock App

A timezone-aware clock application that displays the current time, location, and additional date information based on the user's IP address. The app dynamically adapts its greeting, theme, and background depending on the time of day, and includes a feature to generate random programming quotes. Server-side rendering ensures the correct state is shown immediately on page load.

This project was built as part of a Frontend Mentor challenge and focuses on SSR hydration, timezone correctness, and efficient client-side state management.

---

## Technologies Used

- Astro (SSR and server-first architecture)
- TypeScript
- Netlify (hosting and serverless functions)
- Astro Actions (server-client communication)
- World Time API ([timezone and date data](https://time.now/developer/api/ip))
- Quotes API ([random programming quotes](https://zenquotes.io/api/random))
- SCSS
- Vanilla JavaScript
- GSAP

---

## Features

- Detects user's timezone automatically via IP
- Displays accurate local time and location
- Dynamic greeting, theme, and background based on time of day
- Expandable panel with additional date information:
  - Timezone
  - Day of the week
  - Day of the year
  - Week number
- Generates random programming quotes on demand
- Server-side rendering prevents flash of incorrect content
- Efficient client-side ticking with hourly API synchronization

---

## Build Process

The application uses a hybrid server-client architecture:

- On initial request, the server fetches timezone data using the user's forwarded IP address
- A timezone-aware state object is derived and rendered server-side
- The state is serialized into the HTML and hydrated on the client
- The clock updates locally using a timestamp as the source of truth
- The server is contacted only when necessary to keep the data accurate
- Quotes are fetched via a server-side endpoint to avoid CORS issues and provide consistent handling

Shared utility functions ensure consistent timezone handling across server and client.

---

## Deployment

Deployed on Netlify using the Astro Netlify adapter and serverless functions.

---

## Live Demo

https://fm-smart-clock-app.netlify.app/

---

## Preview

[<video src="/preview/preview.mp4" controls width="100%"></video>](https://github.com/user-attachments/assets/8c191d82-aac3-4068-9b34-7533715a556f)
