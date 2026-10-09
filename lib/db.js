export async function createOrder(order) {
  await init();
  const res = await db.execute({
    sql: `INSERT INTO orders
          (order_num, name, phone, district, addr, house, landmark,
           time_type, pay_type, items, subtotal, delivery, total, status,
           created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new',
                  datetime('now'), datetime('now'))`,
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