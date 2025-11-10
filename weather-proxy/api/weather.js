export default async function handler(req, res) {
  const cityParam = req.query.city ? `?city=${encodeURIComponent(req.query.city)}` : '';
  const targetUrl = `https://query.asilu.com/weather/weather/${cityParam}`;

  try {
    const response = await fetch(targetUrl);
    const body = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(body);
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'proxy failed', detail: error.message });
  }
}
