export default async function handler(req, res) {
  try {
    const response = await fetch('http://api.osugame.online/fetch/');
    const data = await response.text(); // Use .json() if the response is JSON
    res.status(200).send(data);
  } catch (error) {
    console.error('Proxy fetch failed:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
}
