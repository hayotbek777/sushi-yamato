import { createClient } from "@libsql/client";
import dotenv from 'dotenv';

dotenv.config();

const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
});

// Jadvallarni yaratish
export async function initDB() {
  try {
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
        poster_transaction_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

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

// ================= BUYURTMALAR =================
export async function createOrder(data) {
  return await db.execute({
    sql: `INSERT INTO orders (
      order_num, name, phone, district, addr, house, landmark, 
      time_type, pay_type, receipt, items, subtotal, delivery, total, poster_transaction_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.order_num, data.name, data.phone, data.district, data.addr, 
      data.house, data.landmark, data.time_type, data.pay_type, data.receipt, 
      JSON.stringify(data.items), data.subtotal, data.delivery, data.total,
      data.poster_transaction_id || null
    ]
  });
}

export async function getOrders({ status = 'all', limit = 5000 } = {}) {
  let sql = `SELECT * FROM orders`;
  let args = [];
  if (status !== 'all') {
    sql += ` WHERE status = ?`;
    args.push(status);
  }
  sql += ` ORDER BY created_at DESC LIMIT ?`;
  args.push(limit);
  const result = await db.execute({ sql, args });
  return result.rows.map(row => ({
    ...row,
    items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items
  }));
}

export async function getOrderById(id) {
  const result = await db.execute({
    sql: `SELECT * FROM orders WHERE id = ?`,
    args: [id]
  });
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return { ...row, items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items };
}

export async function updateOrderStatus(id, status) {
  if (status === 'delete') {
    return await db.execute({ sql: `DELETE FROM orders WHERE id = ?`, args: [id] });
  }
  return await db.execute({ sql: `UPDATE orders SET status = ? WHERE id = ?`, args: [status, id] });
}

// ================= MAHSULOTLAR (API UCHUN) =================

// api/products.js dagi getProducts uchun
export async function getProducts() {
  const result = await db.execute(`SELECT * FROM products`);
  return result.rows.map(row => ({
    ...row,
    cat: typeof row.cat === 'string' ? JSON.parse(row.cat) : row.cat
  }));
}

// api/products.js dagi addProduct uchun
export async function addProduct(product) {
  return await db.execute({
    sql: `INSERT INTO products (id, name, desc, price, pieces, cat, badge, img) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      product.id, product.name, product.desc || '', product.price, 
      product.pieces || 0, JSON.stringify(product.cat || []), 
      product.badge || null, product.img || null
    ]
  });
}

// api/products.js dagi deleteProductFromDB uchun
export async function deleteProductFromDB(id) {
  return await db.execute({ sql: `DELETE FROM products WHERE id = ?`, args: [id] });
}

export default db;