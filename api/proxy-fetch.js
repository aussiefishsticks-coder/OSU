import https from 'https';

export default async function handler(req, res) {
  const agent = new https.Agent({
    rejectUnauthorized: false, // 👈 Accept self-signed cert
  });

  try {
    const response = await fetch("https://api.osugame.online/fetch/", { agent });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upstream error ${response.status}: ${text}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy fetch failed:", err);
    res.status(500).json({
      error: "Proxy fetch failed",
      details: err.message || "Unknown error",
    });
  }
}
