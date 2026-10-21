import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN
});

let initialized = false;

async function init() {
  if (initialized) return;

  // Buyurtmalar jadvali
  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_num TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      district TEXT,
      addr TEXT NOT NULL,
      house TEXT,
      landmark TEXT NOT NULL,
      time_type TEXT DEFAULT 'now',
      pay_type TEXT DEFAULT 'cash',
      receipt TEXT,
      items TEXT NOT NULL,
      subtotal INTEGER DEFAULT 0,
      delivery INTEGER DEFAULT 0,
      total INTEGER DEFAULT 0,
      status TEXT DEFAULT 'new',
      note TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Mahsulotlar jadvali (YANGI)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price INTEGER DEFAULT 0,
      pieces INTEGER DEFAULT 0,
      cat TEXT,
      badge TEXT,
      img TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  initialized = true;
}

/* --- BUYURTMALAR FUNKSIYALARI --- */
export function generateOrderNum() {
  const ts = Date.now().toString().slice(-6);
  return `#YM-${ts}`;
}

export async function createOrder(order) {
  await init();
  const res = await db.execute({
    sql: `INSERT INTO orders (order_num, name, phone, district, addr, house, landmark, time_type, pay_type, receipt, items, subtotal, delivery, total, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    args: [order.order_num, order.name, order.phone, order.district || '', order.addr || '', order.house || '', order.landmark || '', order.time_type || 'now', order.pay_type || 'cash', order.receipt || null, JSON.stringify(order.items), order.subtotal || 0, order.delivery || 0, order.total || 0]
  });
  return res.lastInsertRowid;
}

export async function getOrders({ status, limit = 100 } = {}) {
  await init();
  let sql = `SELECT * FROM orders`;
  const args = [];
  if (status && status !== 'all') {
    sql += ` WHERE status = ?`;
    args.push(status);
  }
  sql += ` ORDER BY created_at DESC LIMIT ?`;
  args.push(limit);

  const res = await db.execute({ sql, args });
  return res.rows.map(row => ({ ...row, items: safeParse(row.items) }));
}

export async function updateOrderStatus(id, status, note = null) {
  await init();
  await db.execute({
    sql: `UPDATE orders SET status = ?, note = COALESCE(?, note), updated_at = datetime('now') WHERE id = ?`,
    args: [status, note, id]
  });
}

export async function deleteOrderFromDB(id) {
  await init();
  await db.execute({ sql: `DELETE FROM orders WHERE id = ?`, args: [id] });
}

/* --- MAHSULOTLAR FUNKSIYALARI (YANGI) --- */
export async function addProduct(product) {
  await init();
  await db.execute({
    sql: `INSERT INTO products (id, name, description, price, pieces, cat, badge, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [product.id, product.name, product.desc || '', product.price || 0, product.pieces || 0, JSON.stringify(product.cat || []), product.badge || '', product.img]
  });
}

export async function getProducts() {
  await init();
  const res = await db.execute(`SELECT * FROM products ORDER BY created_at DESC`);
  return res.rows.map(row => ({ ...row, cat: safeParse(row.cat) }));
}

function safeParse(str) {
  try { return JSON.parse(str); }
  catch { return []; }
}

export default db;