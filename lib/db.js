import { createClient } from '@libsql/client';

// Turso bazasiga ulanish
const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
});

/* =========================================================
   BUYURTMALAR (ORDERS)
   ========================================================= */

export async function generateOrderNum() {
  const now = new Date();
  const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `#YM-${timeStr}${random}`;
}

export async function createOrder(data) {
  const result = await db.execute({
    sql: `INSERT INTO orders (
      order_num, name, phone, district, addr, house, landmark, 
      time_type, time_value, pay_type, receipt, items, subtotal, delivery, total, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
    args: [
      data.order_num,
      data.name,
      data.phone,
      data.district,
      data.addr,
      data.house,
      data.landmark,
      data.time_type,
      data.time_value || '', // VAQT (SOAT) SAQLANADI
      data.pay_type,
      data.receipt,
      JSON.stringify(data.items),
      data.subtotal,
      data.delivery,
      data.total,
      'new' // Yangi buyurtma statusi
    ]
  });
  return result.rows[0];
}

export async function getOrders({ status = 'all', limit = 100 } = {}) {
  let sql = 'SELECT * FROM orders';
  let args = [];

  if (status && status !== 'all') {
    sql += ' WHERE status = ?';
    args.push(status);
  }

  sql += ' ORDER BY id DESC LIMIT ?';
  args.push(limit);

  const result = await db.execute({ sql, args });
  
  // items ni JSON dan obyektga o'tkazish
  return result.rows.map(row => ({
    ...row,
    items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items
  }));
}

export async function updateOrderStatus(id, status, note = null) {
  await db.execute({
    sql: 'UPDATE orders SET status = ? WHERE id = ?',
    args: [status, id]
  });
}

export async function deleteOrderFromDB(id) {
  await db.execute({
    sql: 'DELETE FROM orders WHERE id = ?',
    args: [id]
  });
}

/* =========================================================
   MAHSULOTLAR (PRODUCTS)
   ========================================================= */

export async function getProducts() {
  const result = await db.execute('SELECT * FROM products ORDER BY id ASC');
  return result.rows.map(row => ({
    ...row,
    cat: typeof row.cat === 'string' ? JSON.parse(row.cat) : row.cat
  }));
}

export async function addProduct(product) {
  await db.execute({
    sql: `INSERT INTO products (
      id, name, desc, price, pieces, cat, badge, img
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      product.id,
      product.name,
      product.desc || '',
      Number(product.price),
      product.pieces || 0,
      JSON.stringify(product.cat || []),
      product.badge || '',
      product.img
    ]
  });
}

export async function deleteProductFromDB(id) {
  await db.execute({
    sql: 'DELETE FROM products WHERE id = ?',
    args: [id]
  });
}

/* =========================================================
   KASSA (SMENA) HOLATI
   ========================================================= */

// Kassa holatini olish (ochiq yoki yopiq)
export async function getKassaStatus() {
  const result = await db.execute('SELECT value FROM settings WHERE key = "kassa_closed"');
  if (result.rows.length === 0) return false; // default: ochiq
  return result.rows[0].value === 'true';
}

// Kassa holatini o'zgartirish
export async function setKassaStatus(isClosed) {
  const val = isClosed ? 'true' : 'false';
  // Agar sozlama mavjud bo'lmasa, qo'shamiz (INSERT OR REPLACE)
  await db.execute({
    sql: 'INSERT OR REPLACE INTO settings (key, value) VALUES ("kassa_closed", ?)',
    args: [val]
  });
}

/* =========================================================
   AGAR BAZADA JADVALLAR BO'LMASA, AVTOMATIK YARATISH (Init)
   ========================================================= */
export async function initDB() {
  // Orders jadvali
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
      time_value TEXT,
      pay_type TEXT,
      receipt TEXT,
      items TEXT,
      subtotal REAL,
      delivery REAL,
      total REAL,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Products jadvali
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Settings jadvali (Kassa holati va h.k uchun)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
}

// Serverni ishga tushirganda bazani tekshirish
initDB().catch(console.error);