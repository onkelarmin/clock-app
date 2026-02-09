// import { getQuote } from "./getQuote";

// export async function initDisplayQuote() {
//   const quoteContent =
//     document.querySelector<HTMLParagraphElement>(".quote-content");
//   const quoteAuthor = document.querySelector<HTMLElement>(".quote-author");
//   const quoteButton =
//     document.querySelector<HTMLButtonElement>(".quote-button");

//   if (!quoteContent || !quoteAuthor || !quoteButton)
//     throw new Error("DOM structure missing");

//   const loadQuote = async () => {
//     try {
//       const quoteData = await getQuote();

//       const { q, a } = quoteData[0];

//       quoteContent.textContent = q;
//       quoteAuthor.textContent = a;
//     } catch (error) {
//       console.error("Failed to load quote:", error);

//       quoteContent.textContent = "Failed to load quote";
//       quoteAuthor.textContent = "";
//     }
//   };

//   quoteButton.addEventListener("click", loadQuote);

//   loadQuote();
// }
import { actions } from "astro:actions";

export async function initDisplayQuote() {
  const quoteContent =
    document.querySelector<HTMLParagraphElement>(".quote-content");
  const quoteAuthor = document.querySelector<HTMLElement>(".quote-author");
  const quoteButton =
    document.querySelector<HTMLButtonElement>(".quote-button");

  if (!quoteContent || !quoteAuthor || !quoteButton)
    throw new Error("DOM structure missing");

  const loadQuote = async () => {
    const { data, error } = await actions.getQuote();

    if (error) {
      console.error("Action failed:", error.message);
      return;
    }

    if (data) {
      const { q, a } = data[0];

      quoteContent.textContent = q;
      quoteAuthor.textContent = a;
    }
  };

  quoteButton.addEventListener("click", loadQuote);

  loadQuote();
}
