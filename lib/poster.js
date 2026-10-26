import axios from 'axios';

export async function sendOrderToPoster(orderData) {
  // Agar token bo'lmasa, Poster'ga yubormaymiz (xato bermaydi)
  if (!process.env.POSTER_TOKEN) {
    console.log('⚠️ Poster tokeni yo\'q. Buyurtma faqat bazaga saqlandi.');
    return { success: false, reason: 'no_token' };
  }

  try {
    // Mahsulotlarni Poster formatiga o'girish
    const products = orderData.items.map(item => ({
      product_id: item.id, // Diqqat: id lar Poster'dagi raqamli ID bo'lishi kerak
      count: item.qty
    }));

    const payload = {
      token: process.env.POSTER_TOKEN,
      spot_id: parseInt(process.env.POSTER_SPOT_ID || '1'),
      phone: orderData.phone,
      first_name: orderData.name || '',
      service_mode: 3, // 3 = Yetkazib berish
      client_address: `${orderData.district}, ${orderData.addr} ${orderData.house}. Mo'ljal: ${orderData.landmark}`,
      products: products
    };

    const response = await axios.post('https://api.joinposter.com/incomingOrders.createIncomingOrder', payload);
    console.log('✅ Poster javobi:', response.data);
    return { success: true, data: response.data };

  } catch (error) {
    console.error('❌ Poster xatosi:', error.response ? error.response.data : error.message);
    return { success: false, error: error.response ? error.response.data : error.message };
  }
}