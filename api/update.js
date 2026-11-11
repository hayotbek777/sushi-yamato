import { updateOrderStatus, getOrderById } from '../lib/db.js';
import { removePosterTransaction, removeIncomingOrder } from '../lib/poster.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const { id, status } = req.body || {};

    if (!id || !status) return res.status(400).json({ success: false, error: 'ID va status kerak' });

    // Agar o'chirilayotgan bo'lsa
    if (status === 'delete') {
      const order = await getOrderById(id);
      
      if (order && order.poster_transaction_id) {
        // 1. Chekni o'chiramiz
        await removePosterTransaction(order.poster_transaction_id);
        // 2. Onlayn buyurtmani ham o'chiramiz
        await removeIncomingOrder(order.poster_transaction_id); 
      }
      
      await updateOrderStatus(id, 'delete');
      return res.status(200).json({ success: true, message: 'Buyurtma va Poster ma\'lumotlari o\'chirildi' });
    }

    // Agar bekor qilinayotgan bo'lsa
    if (status === 'cancelled') {
      await updateOrderStatus(id, 'cancelled');
      
      const order = await getOrderById(id);
      if (order && order.poster_transaction_id) {
        await removePosterTransaction(order.poster_transaction_id);
        await removeIncomingOrder(order.poster_transaction_id);
      }
      
      return res.status(200).json({ success: true, message: 'Buyurtma bekor qilindi' });
    }

    // Boshqa statuslar
    await updateOrderStatus(id, status);
    return res.status(200).json({ success: true, message: 'Holat yangilandi' });

  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({ success: false, error: 'Server xatosi: ' + err.message });
  }
}