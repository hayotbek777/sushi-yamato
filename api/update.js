import { updateOrderStatus, getOrderById } from '../lib/db.js';
import { removeIncomingOrder } from '../lib/poster.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const { id, status } = req.body || {};

    if (!id || !status) {
      return res.status(400).json({ success: false, error: 'ID va status kerak' });
    }

    // 1. Buyurtma o'chirilayotgan bo'lsa (delete)
    if (status === 'delete') {
      const order = await getOrderById(id);
      
      // Agar Poster'da incoming_order_id saqlangan bo'lsa, uni o'chiramiz
      if (order && order.poster_transaction_id) {
        const posterResult = await removeIncomingOrder(order.poster_transaction_id);
        if (!posterResult.success) {
          console.warn(`Poster'dagi buyurtmani o'chirishda xatolik (ID: ${order.poster_transaction_id})`);
        }
      }
      
      // Keyin bazadan o'chiramiz
      await updateOrderStatus(id, 'delete');
      return res.status(200).json({ success: true, message: 'Buyurtma va Poster ma\'lumotlari o\'chirildi' });
    }

    // 2. Buyurtma bekor qilinayotgan bo'lsa (cancelled)
    if (status === 'cancelled') {
      await updateOrderStatus(id, 'cancelled');
      
      // Poster'dagi onlayn buyurtmani ham o'chirishga harakat qilamiz
      const order = await getOrderById(id);
      if (order && order.poster_transaction_id) {
        await removeIncomingOrder(order.poster_transaction_id);
      }
      
      return res.status(200).json({ success: true, message: 'Buyurtma bekor qilindi' });
    }

    // 3. Boshqa statuslar (accepted, cooking, delivering, done)
    await updateOrderStatus(id, status);
    return res.status(200).json({ success: true, message: 'Holat yangilandi' });

  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({ success: false, error: 'Server xatosi: ' + err.message });
  }
}