export async function getQuote() {
  try {
    const res = await fetch("/api/quote");

    if (!res.ok) {
      const error = await res.json();
      console.error("API error:", res.status, error.error);
      throw new Error(error.error || "Request failed");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
}
