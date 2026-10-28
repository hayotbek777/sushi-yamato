import { createClient } from "@libsql/client";
import dotenv from 'dotenv';

// .env faylini o'qish
dotenv.config();

// Bazaga ulanish (TURSO_URL va TURSO_TOKEN .env fayldan olinadi)
const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
});

// Jadvallarni avtomatik yaratish (agar mavjud bo'lmasa)
export async function initDB() {
  try {
    // Buyurtmalar jadvali
    await db.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_num TEXT UNIQUE,
        name TEXT,
        phone TEXT,
        district TEXT,
        addr TEXT,
        house TEXT,
        landmark TEXT,
        time_type TEXT,
        pay_type TEXT,
        receipt TEXT,
        items TEXT,
        subtotal REAL,
        delivery REAL,
        total REAL,
        status TEXT DEFAULT 'new',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Mahsulotlar jadvali (agar bazada saqlash kerak bo'lsa)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        desc TEXT,
        price REAL,
        pieces INTEGER,
        cat TEXT,
        badge TEXT,
        img TEXT,
        poster_product_id TEXT
      )
    `);
    
    console.log("✅ Ma'lumotlar bazasi jadvallari tayyor");
  } catch (error) {
    console.error("❌ Bazani initsializatsiya qilishda xato:", error);
  }
}

// ================= BUYURTMALAR BILAN ISHLASH =================

// Yangi buyurtma qo'shish
export async function createOrder(data) {
  const result = await db.execute({
    sql: `INSERT INTO orders (
      order_num, name, phone, district, addr, house, landmark, 
      time_type, pay_type, receipt, items, subtotal, delivery, total
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.order_num,
      data.name,
      data.phone,
      data.district,
      data.addr,
      data.house,
      data.landmark,
      data.time_type,
      data.pay_type,
      data.receipt,
      JSON.stringify(data.items), // items massivini stringga o'girish
      data.subtotal,
      data.delivery,
      data.total
    ]
  });
  return result;
}

// Buyurtmalarni olish
export async function getOrders({ status = 'all', limit = 100 } = {}) {
  let sql = `SELECT * FROM orders`;
  let args = [];

  if (status !== 'all') {
    sql += ` WHERE status = ?`;
    args.push(status);
  }

  sql += ` ORDER BY created_at DESC LIMIT ?`;
  args.push(limit);

  const result = await db.execute({ sql, args });
  
  // items ni qayta massivga o'girish
  return result.rows.map(row => ({
    ...row,
    items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items
  }));
}

// Buyurtma statusini o'zgartirish
export async function updateOrderStatus(id, status) {
  if (status === 'delete') {
    return await db.execute({
      sql: `DELETE FROM orders WHERE id = ?`,
      args: [id]
    });
  }
  
  return await db.execute({
    sql: `UPDATE orders SET status = ? WHERE id = ?`,
    args: [status, id]
  });
}

// ================= MAHSULOTLAR BILAN ISHLASH =================

// Barcha mahsulotlarni olish
export async function getProducts() {
  const result = await db.execute(`SELECT * FROM products`);
  return result.rows.map(row => ({
    ...row,
    cat: typeof row.cat === 'string' ? JSON.parse(row.cat) : row.cat
  }));
}

// Yangi mahsulot qo'shish
export async function createProduct(product) {
  return await db.execute({
    sql: `INSERT INTO products (id, name, desc, price, pieces, cat, badge, img, poster_product_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      product.id,
      product.name,
      product.desc,
      product.price,
      product.pieces,
      JSON.stringify(product.cat),
      product.badge,
      product.img,
      product.poster_product_id || null
    ]
  });
}

// Mahsulotni o'chirish
export async function deleteProduct(id) {
  return await db.execute({
    sql: `DELETE FROM products WHERE id = ?`,
    args: [id]
  });
}

export default db;