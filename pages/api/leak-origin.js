// pages/api/leak-origin.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { target } = req.query;
  if (!target || !/^https?:\/\//i.test(target)) {
    return res.status(400).json({ error: 'Invalid or missing `target`' });
  }
  try {
    // Fetch from *inside* the Vercel serverless node
    const response = await fetch(target, { method: 'GET', redirect: 'manual' });
    const originIP = req.socket.localAddress;
    return res.status(200).json({
      originIP,
      fetchedStatus: response.status,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
