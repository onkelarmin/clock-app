// import type { APIRoute } from "astro";

// export const GET: APIRoute = async () => {
//   try {
//     const res = await fetch("https://zenquotes.io/api/random");

//     if (!res.ok) {
//       console.error("Upstream error:", res.status);

//       return new Response(
//         JSON.stringify({ error: `Upstream service failed` }),
//         { status: 502 },
//       );
//     }

//     const data = await res.json();

//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Unexpected error:", error);

//     return new Response(JSON.stringify({ error: "Internal server error" }), {
//       status: 500,
//     });
//   }
// };
