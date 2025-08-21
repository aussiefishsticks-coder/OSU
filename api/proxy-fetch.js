export default async function handler(req, res) {
  const sid = req.query.sid;
  if (!sid) {
    return res.status(400).send("Missing 'sid' parameter");
  }

  try {
    const response = await fetch(`https://cdn.sayobot.cn:25225/beatmaps/download/mini/${sid}`);
    if (!response.ok) {
      return res.status(502).send("Failed to fetch beatmap");
    }

    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Proxy fetch failed:", err);
    res.status(500).send("Internal server error");
  }
}
