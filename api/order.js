import { createOrder, generateOrderNum } from '../lib/db.js';

export default async function handler(req, res) {
  // CORS sozlamalari
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};

    if (!body.name || !body.phone) {
      return res.status(400).json({ success: false, error: 'Ism va telefon kerak' });
    }
    if (!body.landmark) {
      return res.status(400).json({ success: false, error: 'Mo\'ljal kiritilmagan' });
    }
    if (body.pay !== 'cash' && !body.receipt) {
      return res.status(400).json({ success: false, error: 'To\'lov cheki yuklanmagan' });
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return res.status(400).json({ success: false, error: 'Savat bo\'sh' });
    }

    const orderNum = generateOrderNum();

    // VAQTNI BIRLASHTIRISH
    let finalTimeType = body.time || 'now';
    if (body.time === 'later' && body.time_value) {
      finalTimeType = `later|${body.time_value}`;
    }

    // Bazaga saqlash
    await createOrder({
      order_num: orderNum,
      name: String(body.name).slice(0, 100),
      phone: String(body.phone).slice(0, 30),
      district: body.district || 'Urganch',
      addr: body.addr || '',
      house: body.house || '',
      landmark: body.landmark || '',
      time_type: finalTimeType,
      pay_type: body.pay || 'cash',
      receipt: body.receipt || null, 
      items: body.items,
      subtotal: Number(body.subtotal) || 0,
      delivery: Number(body.delivery) || 0,
      total: Number(body.total) || 0
    });

    return res.status(200).json({ success: true, orderNum });

  } catch (err) {
    console.error('Order error:', err);
    // Agar xato bo'lsa ham, frontendga to'g'ri JSON qaytaramiz
    return res.status(500).json({ success: false, error: 'Server xatosi: ' + err.message });
  }
}