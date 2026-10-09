/* =========================================================
   MA'LUMOTLAR BAZASI — Turso (LibSQL)
   ========================================================= */
import { createClient } from '@libsql/client';

/* --- Ulanish --- */
const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN
});

/* =========================================================
   JADVALLARNI YARATISH (birinchi ishga tushganda)
   ========================================================= */
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
      addr TEXT,
      house TEXT,
      landmark TEXT,
      time_type TEXT DEFAULT 'now',
      pay_type TEXT DEFAULT 'cash',
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

  // Admin foydalanuvchilar (agar kelajakda kerak bo‘lsa)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Indekslar
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC)`);

  initialized = true;
}

/* =========================================================
   YORDAMCHI FUNKSIYALAR
   ========================================================= */

/** Buyurtma raqami generatsiyasi: #YM-XXXXXX */
export function generateOrderNum() {
  const ts = Date.now().toString().slice(-6);
  return `#YM-${ts}`;
}

/** Yangi buyurtma qo‘shish */
export async function createOrder(order) {
  await init();
  const res = await db.execute({
    sql: `INSERT INTO orders
          (order_num, name, phone, district, addr, house, landmark,
           time_type, pay_type, items, subtotal, delivery, total, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    args: [
      order.order_num,
      order.name,
      order.phone,
      order.district || '',
      order.addr || '',
      order.house || '',
      order.landmark || '',
      order.time_type || 'now',
      order.pay_type || 'cash',
      JSON.stringify(order.items),
      order.subtotal || 0,
      order.delivery || 0,
      order.total || 0
    ]
  });
  return res.lastInsertRowid;
}

/** Barcha buyurtmalar (filter bilan) */
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
  return res.rows.map(row => ({
    ...row,
    items: safeParse(row.items)
  }));
}

/** Bitta buyurtma */
export async function getOrder(id) {
  await init();
  const res = await db.execute({
    sql: `SELECT * FROM orders WHERE id = ?`,
    args: [id]
  });
  if (!res.rows.length) return null;
  const row = res.rows[0];
  return { ...row, items: safeParse(row.items) };
}

/** Buyurtma holatini yangilash */
export async function updateOrderStatus(id, status, note = null) {
  await init();
  await db.execute({
    sql: `UPDATE orders SET status = ?, note = COALESCE(?, note), updated_at = datetime('now') WHERE id = ?`,
    args: [status, note, id]
  });
}

/** Statistika */
export async function getStats() {
  await init();
  const today = new Date().toISOString().slice(0, 10);

  const totalRes = await db.execute(`SELECT COUNT(*) as c, COALESCE(SUM(total),0) as s FROM orders`);
  const todayRes = await db.execute({
    sql: `SELECT COUNT(*) as c, COALESCE(SUM(total),0) as s FROM orders WHERE date(created_at) = ?`,
    args: [today]
  });
  const statusRes = await db.execute(`
    SELECT status, COUNT(*) as c FROM orders GROUP BY status
  `);

  const byStatus = {};
  statusRes.rows.forEach(r => { byStatus[r.status] = r.c; });

  return {
    totalOrders: totalRes.rows[0].c,
    totalSum: totalRes.rows[0].s,
    todayOrders: todayRes.rows[0].c,
    todaySum: todayRes.rows[0].s,
    byStatus
  };
}

/* --- Ichki yordamchi --- */
function safeParse(str) {
  try { return JSON.parse(str); }
  catch { return []; }
}

export default db;