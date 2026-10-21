/* =========================================================
   API / PRODUCTS
   ========================================================= */
import { addProduct, getProducts, deleteProductFromDB, updateProductDiscount } from '../lib/db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yamato-super-secret-key-2026';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '');

  // 1. Mahsulotlarni olish (GET)
  if (req.method === 'GET') {
    try {
      const products = await getProducts();
      return res.status(200).json({ success: true, products });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'Server xatosi' });
    }
  }

  // Qolgan metodlar faqat admin uchun (Tokenni tekshirish)
  try { jwt.verify(token, JWT_SECRET); } 
  catch { return res.status(401).json({ success: false, error: 'Ruxsat yo\'q' }); }

  // 2. Yangi mahsulot qo'shish (POST)
  if (req.method === 'POST') {
    try {
      const p = req.body;
      if (!p.name || !p.price || !p.img) {
        return res.status(400).json({ success: false, error: 'Ma\'lumotlar to\'liq emas' });
      }
      await addProduct(p);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'Bazaga saqlashda xato' });
    }
  }

  // 3. Aksiya qilish (Narxni yangilash - PUT)
  if (req.method === 'PUT') {
    try {
      const { id, newPrice } = req.body;
      if (!id || !newPrice) return res.status(400).json({ success: false, error: 'ID va Narx kerak' });
      
      await updateProductDiscount(id, newPrice);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'Yangilashda xato' });
    }
  }

  // 4. Mahsulotni o'chirish (DELETE)
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ success: false, error: 'ID kerak' });
      
      await deleteProductFromDB(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'O\'chirishda xato' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}