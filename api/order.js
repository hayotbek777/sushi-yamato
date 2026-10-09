/* =========================================================
   POST /api/order — Yangi buyurtma qabul qilish
   ========================================================= */
import { createOrder, generateOrderNum } from '../lib/db.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};

    // --- Validatsiya ---
    if (!body.name || !body.phone) {
      return res.status(400).json({ success: false, error: 'Ism va telefon kerak' });
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return res.status(400).json({ success: false, error: 'Savat bo\'sh' });
    }

    // --- Buyurtma raqami ---
    const orderNum = generateOrderNum();

    // --- Saqlash ---
    await createOrder({
      order_num: orderNum,
      name: String(body.name).slice(0, 100),
      phone: String(body.phone).slice(0, 30),
      district: body.district || '',
      addr: body.addr || '',
      house: body.house || '',
      landmark: body.landmark || '',
      time_type: body.time || 'now',
      pay_type: body.pay || 'cash',
      items: body.items,
      subtotal: Number(body.subtotal) || 0,
      delivery: Number(body.delivery) || 0,
      total: Number(body.total) || 0
    });

    return res.status(200).json({
      success: true,
      orderNum
    });

  } catch (err) {
    console.error('Order error:', err);
    return res.status(500).json({
      success: false,
      error: 'Server xatosi'
    });
  }
}