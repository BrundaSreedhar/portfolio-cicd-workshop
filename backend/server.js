import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/api/concept", async (req, res) => {
  const topics = ["Dynamic Programming", "Two Pointers", "Graphs", "Binary Search"];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const prompt = `Explain the concept of ${randomTopic} in 2 sentences for a CS student revising LeetCode.`;
  
  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await completion.json();
    res.json({ topic: randomTopic, explanation: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));