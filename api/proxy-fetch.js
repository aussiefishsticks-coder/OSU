export default async function handler(req, res) {
  const response = await fetch("http://api.osugame.online/fetch/");
  const data = await response.json();
  res.status(200).json(data);
}
