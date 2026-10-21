/* =========================================================
   GET /api/orders — Buyurtmalar va Statistika (Kassa bilan)
   ========================================================= */
import jwt from 'jsonwebtoken';
import { getOrders, getKassaStatus } from '../lib/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'yamato-super-secret-key-2026';

function auth(req, res) {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
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

    // Bazadan kassa holatini olamiz
    const isKassaClosed = await getKassaStatus();

    if (stats) {
      const allOrders = await getOrders({ status: 'all', limit: 5000 });
      
      const now = new Date();
      let businessDate = now.toISOString().slice(0, 10);
      
      // Agar kassa yopilgan bo'lsa -> ertangi kun
      if (isKassaClosed) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        businessDate = tomorrow.toISOString().slice(0, 10);
      } 
      // Agar kassa ochiq va soat 06:00 gacha bo'lsa -> kechagi kun
      else if (now.getHours() < 6) {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        businessDate = yesterday.toISOString().slice(0, 10);
      }

      let totalOrders = 0, totalSum = 0, todayOrders = 0, todaySum = 0;
      const byStatus = {};
      
      allOrders.forEach(o => {
        byStatus[o.status] = (byStatus[o.status] || 0) + 1;
        if (o.status !== 'cancelled') {
          totalOrders++;
          totalSum += Number(o.total) || 0;
          
          // Faqat tanlangan biznes kuniga tegishli buyurtmalarni hisoblaymiz
          const orderDate = o.business_date || o.created_at;
          if (orderDate && orderDate.startsWith(businessDate)) {
            todayOrders++;
            todaySum += Number(o.total) || 0;
          }
        }
      });

      return res.status(200).json({ 
        success: true, 
        stats: { totalOrders, totalSum, todayOrders, todaySum, byStatus, kassaClosed: isKassaClosed, businessDate } 
      });
    }

    const orders = await getOrders({ status, limit: 200 });
    
    // Agar kassa yopilgan bo'lsa, faqat ertangi kunga tegishli buyurtmalarni qaytaramiz 
    // (Hozircha yangi buyurtmalar yo'q, shuning uchun bo'sh qaytadi)
    let filteredOrders = orders;
    if (isKassaClosed) {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextBusinessDate = tomorrow.toISOString().slice(0, 10);
      filteredOrders = orders.filter(o => {
        const date = o.business_date || o.created_at;
        return date && date.startsWith(nextBusinessDate);
      });
    }

    return res.status(200).json({ success: true, orders: filteredOrders });

  } catch (err) {
    console.error('Orders error:', err);
    return res.status(500).json({ success: false, error: 'Server xatosi' });
  }
}