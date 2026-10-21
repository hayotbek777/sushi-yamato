/* =========================================================
   API / PRODUCTS — Mahsulotlarni olish va qo'shish
   ========================================================= */
import { addProduct, getProducts } from '../lib/db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yamato-super-secret-key-2026';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 1. Mahsulotlarni olish (Mijoz sayti uchun - GET)
  if (req.method === 'GET') {
    try {
      const products = await getProducts();
      return res.status(200).json({ success: true, products });
    } catch (err) {
      console.error("GET products error:", err);
      return res.status(500).json({ success: false, error: 'Server xatosi' });
    }
  }

  // 2. Yangi mahsulot qo'shish (Admin panel uchun - POST)
  if (req.method === 'POST') {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    
    // Tokenni tekshirish
    try { 
      jwt.verify(token, JWT_SECRET); 
    } catch { 
      return res.status(401).json({ success: false, error: 'Ruxsat yo\'q' }); 
    }

    try {
      const p = req.body;
      if (!p.name || !p.price || !p.img) {
        return res.status(400).json({ success: false, error: 'Ma\'lumotlar to\'liq emas' });
      }
      
      await addProduct(p);
      return res.status(200).json({ success: true });
      
    } catch (err) {
      console.error("POST product error:", err);
      return res.status(500).json({ success: false, error: 'Bazaga saqlashda xato' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}