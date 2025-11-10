export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const cityParam = req.query.city ? `?city=${encodeURIComponent(req.query.city)}` : '';
  const targetUrl = `https://query.asilu.com/weather/weather/${cityParam}`;

  try {
    const response = await fetch(targetUrl);
    const body = await response.text();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(body);
  } catch (error) {
    res.status(500).json({ error: 'proxy failed', detail: error.message });
  }
}
