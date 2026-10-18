/* =========================================================
   GET /api/orders — Buyurtmalar ro'yxati va Statistika
   ========================================================= */
import jwt from 'jsonwebtoken';
import { getOrders } from '../lib/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'yamato-super-secret-key-2026';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const user = auth(req, res);
  if (!user) return;

  try {
    const status = req.query.status || 'all';
    const stats = req.query.stats === '1';

    if (stats) {
      // Barcha buyurtmalarni olamiz
      const allOrders = await getOrders({ status: 'all', limit: 10000 });
      
      // Bugungi sanani olish (YYYY-MM-DD formatida)
      const todayStr = new Date().toISOString().slice(0, 10);
      
      let totalOrders = 0;
      let totalSum = 0;
      let todayOrders = 0;
      let todaySum = 0;
      const byStatus = {};
      
      allOrders.forEach(o => {
        // 1. Filtrlar (tugmalar) uchun hamma buyurtma sonini hisoblaymiz
        byStatus[o.status] = (byStatus[o.status] || 0) + 1;

        // 2. Summalarga faqat bekor qilinmaganlarni qo'shamiz
        if (o.status !== 'cancelled') {
          totalOrders++;
          
          // MUHIM: Number() orqali qat'iy raqamga o'giramiz, xato bo'lmasligi uchun
          totalSum += Number(o.total) || 0; 
          
          // Bugungi summani hisoblash
          if (o.created_at && o.created_at.startsWith(todayStr)) {
            todayOrders++;
            todaySum += Number(o.total) || 0;
          }
        }
      });

      return res.status(200).json({ 
        success: true, 
        stats: { totalOrders, totalSum, todayOrders, todaySum, byStatus } 
      });
    }

    const orders = await getOrders({ status, limit: 200 });
    return res.status(200).json({ success: true, orders });

  } catch (err) {
    console.error('Orders error:', err);
    return res.status(500).json({ success: false, error: 'Server xatosi' });
  }
}