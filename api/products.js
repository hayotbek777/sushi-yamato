/* =========================================================
   API / PRODUCTS (Faqat Qo'shish, Ko'rish va O'chirish)
   ========================================================= */
import { addProduct, getProducts, deleteProductFromDB } from '../lib/db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yamato-super-secret-key-2026';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '');

  // 1. Mahsulotlarni olish (GET) - Hamma ko'ra oladi
  if (req.method === 'GET') {
    try {
      const products = await getProducts();
      return res.status(200).json({ success: true, products });
    } catch (err) {
      console.error('GET products error:', err);
      return res.status(500).json({ success: false, error: 'Server xatosi' });
    }
  }

  // Qolgan metodlar (POST, DELETE) faqat admin uchun
  try { jwt.verify(token, JWT_SECRET); } 
  catch { return res.status(401).json({ success: false, error: 'Ruxsat yo\'q' }); }

  // 2. Yangi mahsulot qo'shish (POST)
  if (req.method === 'POST') {
    try {
      const p = req.body;
      if (!p.name || !p.price || !p.img) {
        return res.status(400).json({ success: false, error: 'Ma\'lumotlar to\'liq emas (Nomi, narxi va rasm kerak)' });
      }
      
      // Bazaga qo'shish
      await addProduct(p);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('POST product error:', err);
      return res.status(500).json({ success: false, error: 'Bazaga saqlashda xato' });
    }
  }

  // 3. Mahsulotni o'chirish (DELETE)
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ success: false, error: 'ID kerak' });
      
      await deleteProductFromDB(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('DELETE product error:', err);
      return res.status(500).json({ success: false, error: 'O\'chirishda xato' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}