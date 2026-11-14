import jwt from 'jsonwebtoken';
import { getOrders } from '../lib/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'yamato-super-secret-key-2026';

function auth(req, res) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) { res.status(401).json({ success: false, error: 'Token kerak' }); return null; }
  try { return jwt.verify(token, JWT_SECRET); } 
  catch { res.status(401).json({ success: false, error: 'Token yaroqsiz' }); return null; }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method not allowed' });

  const user = auth(req, res);
  if (!user) return;

  try {
    const status = req.query.status || 'all';
    const stats = req.query.stats === '1';
    const filterDate = req.query.date || null; // Kalendardan keladigan sana

    const allOrders = await getOrders({ status: 'all', limit: 5000 });

    // Bugungi yarim tun (00:00:00)
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    // 1. Statistika
    if (stats) {
      let totalOrders = 0, totalSum = 0;
      let todayOrders = 0, todaySum = 0;
      const byStatus = {};

      allOrders.forEach(o => {
        // Jami (barcha vaqt)
        if (o.status !== 'cancelled') {
          totalOrders++;
          totalSum += Number(o.total) || 0;
        }
        
        const orderDate = new Date(o.created_at.replace(' ', 'T') + 'Z');
        
        // Bugungi (faqat 00:00 dan keyingilar)
        if (o.status !== 'cancelled' && orderDate >= todayStart) {
          byStatus[o.status] = (byStatus[o.status] || 0) + 1;
          todayOrders++;
          todaySum += Number(o.total) || 0;
        }
      });

      return res.status(200).json({ 
        success: true, 
        stats: { totalOrders, totalSum, todayOrders, todaySum, byStatus } 
      });
    }

    // 2. Bekor qilinganlar
    if (status === 'cancelled') {
      const cancelled = allOrders.filter(o => {
        if (o.status !== 'cancelled') return false;
        if (!filterDate) return true;
        const orderDate = new Date(o.created_at.replace(' ', 'T') + 'Z');
        const target = new Date(filterDate);
        return orderDate.getDate() === target.getDate() && 
               orderDate.getMonth() === target.getMonth() && 
               orderDate.getFullYear() === target.getFullYear();
      });
      return res.status(200).json({ success: true, orders: cancelled });
    }

    // 3. Asosiy ro'yxat
    const currentOrders = allOrders.filter(o => {
      if (o.status === 'cancelled') return false;
      
      // Agar kalendardan sana tanlangan bo'lsa, faqat o'sha kungilarni qaytaramiz
      if (filterDate) {
        const orderDate = new Date(o.created_at.replace(' ', 'T') + 'Z');
        const target = new Date(filterDate);
        return orderDate.getDate() === target.getDate() && 
               orderDate.getMonth() === target.getMonth() && 
               orderDate.getFullYear() === target.getFullYear();
      }
      
      // AGAR SANA TANLANMAGAN BO'LSA, FAQAT BUGUNGI (00:00 dan keyingi) BUYURTMALARNI QAYTARAMIZ
      const orderDate = new Date(o.created_at.replace(' ', 'T') + 'Z');
      return orderDate >= todayStart;
    });

    return res.status(200).json({ success: true, orders: currentOrders });

  } catch (err) {
    console.error('Orders error:', err);
    return res.status(500).json({ success: false, error: 'Server xatosi' });
  }
}