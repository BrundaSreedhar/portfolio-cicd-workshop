const button = document.getElementById("next");
const content = document.getElementById("content");

button.addEventListener("click", async () => {
  content.innerHTML = "<p>⏳ Fetching concept...</p>";
  try {
    const res = await fetch("/api/concept");
    if (!res.ok) throw new Error("Failed to fetch concept");
    const data = await res.json();
    content.innerHTML = `
      <p class="topic">${data.topic}</p>
      <p class="explanation">${data.explanation}</p>
    `;
  } catch (error) {
    content.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
  }
});