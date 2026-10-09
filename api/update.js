/* =========================================================
   POST /api/update — Buyurtma holatini yangilash
   ========================================================= */
import jwt from 'jsonwebtoken';
import { updateOrderStatus } from '../lib/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'yamato-super-secret-key-2026';

const ALLOWED = ['new', 'accepted', 'cooking', 'delivering', 'done', 'cancelled'];

function auth(req, res) {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ success: false, error: 'Token kerak' });
    return null;
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    res.status(401).json({ success: false, error: 'Token yaroqsiz' });
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const user = auth(req, res);
  if (!user) return;

  try {
    const { id, status, note } = req.body || {};

    if (!id || !status) {
      return res.status(400).json({ success: false, error: 'id va status kerak' });
    }
    if (!ALLOWED.includes(status)) {
      return res.status(400).json({ success: false, error: 'Status noto\'g\'ri' });
    }

    await updateOrderStatus(id, status, note || null);
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({ success: false, error: 'Server xatosi' });
  }
}