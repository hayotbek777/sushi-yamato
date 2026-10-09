/* =========================================================
   POST /api/login — Admin kirishi (JWT)
   ========================================================= */
import jwt from 'jsonwebtoken';

const ADMIN_USER = process.env.ADMIN_USER || 'sushiyamatoadmin2026';
const ADMIN_PASS = process.env.ADMIN_PASS || 'sushiyamatoadmin2026';
const JWT_SECRET = process.env.JWT_SECRET || 'yamato-super-secret-key-2026';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Login va parol kerak' });
    }

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return res.status(401).json({ success: false, error: 'Login yoki parol xato' });
    }

    const token = jwt.sign(
      { user: username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: username
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Server xatosi' });
  }
}