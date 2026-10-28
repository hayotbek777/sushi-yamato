import axios from 'axios';

export async function sendOrderToPoster(orderData) {
  // Agar token bo'lmasa, Poster'ga yubormaymiz
  if (!process.env.POSTER_TOKEN) {
    return { success: false, reason: 'no_token' };
  }

  try {
    const products = orderData.items.map(item => ({
      product_id: item.id,
      count: item.qty
    }));

    const payload = {
      token: process.env.POSTER_TOKEN,
      spot_id: parseInt(process.env.POSTER_SPOT_ID || '1'),
      phone: orderData.phone,
      first_name: orderData.name || '',
      service_mode: 3,
      client_address: `${orderData.district}, ${orderData.addr} ${orderData.house}. Mo'ljal: ${orderData.landmark}`,
      products: products
    };

    const response = await axios.post('https://joinposter.com/api/incomingOrders.createIncomingOrder', payload);
    
    return { success: true, data: response.data };

  } catch (error) {
    // Xatolik bo'lsa ham, uni faqat terminalga yozamiz (mijozga ko'rinmaydi)
    console.error('Poster xatosi:', error.response ? error.response.data : error.message);
    return { success: false, error: error.response ? error.response.data : error.message };
  }
}