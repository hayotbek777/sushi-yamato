import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
});

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

    // Avtomatik time_value ustunini qo'shish
    try {
      await db.execute('SELECT time_value FROM orders LIMIT 1');
    } catch (error) {
      if (error.message.includes('no such column') || error.message.includes('no column named')) {
        await db.execute('ALTER TABLE orders ADD COLUMN time_value TEXT;');
      }
    }

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

    await db.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      );
    `);
  } catch (e) {
    console.error("DB Init xatosi:", e);
  }
}
initDB().catch(console.error);

export async function generateOrderNum() {
  const now = new Date();
  const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
  // 4 xonali tasodifiy harf va raqamlar aralashmasi qo'shamiz (takrorlanmasligi uchun)
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase(); 
  return `#YM-${timeStr}-${randomStr}`;
}

export async function createOrder(data) {
  const result = await db.execute({
    sql: `INSERT INTO orders (
      order_num, name, phone, district, addr, house, landmark, 
      time_type, time_value, pay_type, receipt, items, subtotal, delivery, total, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
    args: [
      data.order_num, data.name, data.phone, data.district, data.addr, 
      data.house, data.landmark, data.time_type, data.time_value || '', 
      data.pay_type, data.receipt, JSON.stringify(data.items), 
      data.subtotal, data.delivery, data.total, 'new'
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
  return result.rows.map(row => ({
    ...row,
    items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items
  }));
}

export async function updateOrderStatus(id, status, note = null) {
  await db.execute({ sql: 'UPDATE orders SET status = ? WHERE id = ?', args: [status, id] });
}

export async function deleteOrderFromDB(id) {
  await db.execute({ sql: 'DELETE FROM orders WHERE id = ?', args: [id] });
}

export async function getProducts() {
  const result = await db.execute('SELECT * FROM products ORDER BY id ASC');
  return result.rows.map(row => ({
    ...row,
    cat: typeof row.cat === 'string' ? JSON.parse(row.cat) : row.cat
  }));
}

export async function addProduct(product) {
  await db.execute({
    sql: `INSERT INTO products (id, name, desc, price, pieces, cat, badge, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      product.id, product.name, product.desc || '', Number(product.price), 
      product.pieces || 0, JSON.stringify(product.cat || []), product.badge || '', product.img
    ]
  });
}

export async function deleteProductFromDB(id) {
  await db.execute({ sql: 'DELETE FROM products WHERE id = ?', args: [id] });
}

export async function updateProductDiscount(id, newPrice) {
  await db.execute({ sql: 'UPDATE products SET price = ? WHERE id = ?', args: [newPrice, id] });
}

export async function getKassaStatus() {
  const result = await db.execute('SELECT value FROM settings WHERE key = "kassa_closed"');
  if (result.rows.length === 0) return false;
  return result.rows[0].value === 'true';
}

export async function setKassaStatus(isClosed) {
  const val = isClosed ? 'true' : 'false';
  await db.execute({
    sql: 'INSERT OR REPLACE INTO settings (key, value) VALUES ("kassa_closed", ?)',
    args: [val]
  });
}