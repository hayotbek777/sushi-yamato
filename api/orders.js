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
    const kassa = await getKassaStatus();
    
    const allOrders = await getOrders({ status: 'all', limit: 5000 });
    
    // Agar kassa yopilgan bo'lsa, eng oxirgi yopilgan vaqtdan keyingi buyurtmalarni olamiz.
    // Agar kassa ochiq bo'lsa, eng oxirgi ochilgan vaqtdan keyingilarini olamiz.
    let sessionStartTime = null;
    if (kassa) {
      if (kassa.is_closed) {
        sessionStartTime = kassa.last_closed_at;
      } else {
        sessionStartTime = kassa.last_opened_at;
      }
    }

    // Joriy smenadagi buyurtmalar
    const currentSessionOrders = allOrders.filter(o => {
      if (o.status === 'cancelled') return false;
      if (!sessionStartTime) return true; // Smena vaqti noma'lum bo'lsa hammasini ko'rsatamiz
      return new Date(o.created_at) >= new Date(sessionStartTime);
    });

    // Statistika
    if (stats) {
      let totalOrders = 0, totalSum = 0;
      let todayOrders = 0, todaySum = 0;
      const byStatus = {};

      allOrders.forEach(o => {
        if (o.status !== 'cancelled') {
          totalOrders++;
          totalSum += Number(o.total) || 0;
        }
      });

      currentSessionOrders.forEach(o => {
        byStatus[o.status] = (byStatus[o.status] || 0) + 1;
        todayOrders++;
        todaySum += Number(o.total) || 0;
      });

      return res.status(200).json({ 
        success: true, 
        stats: { totalOrders, totalSum, todayOrders, todaySum, byStatus, kassa } 
      });
    }

    // Ro'yxatni qaytarish
    if (status === 'cancelled') {
      const cancelled = allOrders.filter(o => o.status === 'cancelled' && (!sessionStartTime || new Date(o.created_at) >= new Date(sessionStartTime)));
      return res.status(200).json({ success: true, orders: cancelled });
    }

    return res.status(200).json({ success: true, orders: currentSessionOrders });

  } catch (err) {
    console.error('Orders error:', err);
    return res.status(500).json({ success: false, error: 'Server xatosi' });
  }
}