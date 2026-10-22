import jwt from 'jsonwebtoken';
import { getKassaStatus, setKassaStatus } from '../lib/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'yamato-super-secret-key-2026';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try { jwt.verify(token, JWT_SECRET); } 
  catch { return res.status(401).json({ success: false, error: 'Ruxsat yo\'q' }); }

  if (req.method === 'GET') {
    const statusData = await getKassaStatus();
    return res.status(200).json({ success: true, kassa: statusData });
  }

  if (req.method === 'POST') {
    const { action } = req.body;
    const now = new Date().toISOString();
    
    if (action === 'open') {
      await setKassaStatus({ is_closed: false, last_opened_at: now });
      return res.status(200).json({ success: true });
    } else if (action === 'close') {
      await setKassaStatus({ is_closed: true, last_closed_at: now });
      return res.status(200).json({ success: true });
    }
    return res.status(400).json({ success: false, error: 'Noto\'g\'ri amal' });
  }
}