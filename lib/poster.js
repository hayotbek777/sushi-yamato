import axios from 'axios';

// 1. Buyurtma yuborish funksiyasi
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
    
    // MUHIM: Poster javobidan transaction_id ni qaytaramiz
    return { 
      success: true, 
      data: response.data,
      transaction_id: response.data.response?.incoming_order_id || null 
    };

  } catch (error) {
    // Xatolik bo'lsa ham, uni faqat terminalga yozamiz (mijozga ko'rinmaydi)
    console.error('Poster xatosi:', error.response ? error.response.data : error.message);
    return { success: false, error: error.response ? error.response.data : error.message };
  }
}

// 2. Chekni o'chirish funksiyasi (Alohida funksiya!)
export async function removePosterTransaction(transactionId) {
  if (!process.env.POSTER_TOKEN || !transactionId) {
    return { success: false, reason: 'no_token_or_id' };
  }

  try {
    const payload = {
      token: process.env.POSTER_TOKEN,
      spot_tablet_id: 1, // Kassa ID (odatda 1)
      transaction_id: transactionId,
      user_id: 3 // Xodim ID (odatda 3)
    };

    const response = await axios.post('https://joinposter.com/api/transactions.removeTransaction', payload);
    
    if (response.data && response.data.response === true) {
      return { success: true };
    } else {
      return { success: false, error: response.data };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}