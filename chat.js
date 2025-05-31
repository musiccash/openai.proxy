export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await openaiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur proxy", details: err.message });
  }
}
