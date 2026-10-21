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
    const isKassaClosed = await getKassaStatus();

    // 1. Hozirgi biznes kunini aniqlash
    const now = new Date();
    let businessDate = now.toISOString().slice(0, 10);
    
    if (isKassaClosed) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      businessDate = tomorrow.toISOString().slice(0, 10);
    } else if (now.getHours() < 6) {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      businessDate = yesterday.toISOString().slice(0, 10);
    }

    // 2. Bazadan barcha buyurtmalarni olamiz
    const allOrders = await getOrders({ status: 'all', limit: 5000 });
    
    // 3. "Bugungi" ro'yxatni filtrlaymiz (Kassa yopilgan bo'lsa, bu ro'yxat bo'sh bo'ladi)
    const todayOrdersList = allOrders.filter(o => {
      if (o.status === 'cancelled') return false;
      const orderDate = o.business_date || o.created_at;
      return orderDate && orderDate.startsWith(businessDate);
    });

    if (stats) {
      // --- JAMI HISOBLASH (Kassa holatidan qat'i nazar hamma vaqt hisoblanadi) ---
      let totalOrders = 0, totalSum = 0;
      allOrders.forEach(o => {
        if (o.status !== 'cancelled') {
          totalOrders++;
          totalSum += Number(o.total) || 0;
        }
      });

      // --- BUGUNGI HISOBLASH (Faqat shu kunga tegishli) ---
      let todayOrders = 0, todaySum = 0;
      const byStatus = {};

      todayOrdersList.forEach(o => {
        byStatus[o.status] = (byStatus[o.status] || 0) + 1;
        todayOrders++;
        todaySum += Number(o.total) || 0;
      });

      return res.status(200).json({ 
        success: true, 
        stats: { totalOrders, totalSum, todayOrders, todaySum, byStatus, kassaClosed: isKassaClosed } 
      });
    }

    // --- RO'YXATNI QAYTARISH ---
    // Agar "Barchasi" (all) bo'lsa, faqat bugungi buyurtmalarni qaytaramiz (kassa yopilsa bo'sh bo'ladi)
    return res.status(200).json({ success: true, orders: todayOrdersList });

  } catch (err) {
    console.error('Orders error:', err);
    return res.status(500).json({ success: false, error: 'Server xatosi' });
  }
}