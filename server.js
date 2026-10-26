import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Sizning api/ papkangizdagi fayllarni ulash
import orderHandler from './api/order.js';
import ordersHandler from './api/orders.js';
// import productsHandler from './api/products.js'; // agar products fayli shunday eksport qilsa

app.post('/api/order', orderHandler);
app.get('/api/orders', ordersHandler);
// app.get('/api/products', productsHandler);

// Frontend fayllarni statik qilib berish (index.html, style.css, app.js)
app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} portida ishga tushdi`);
});