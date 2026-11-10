import axios from 'axios';

// 1. Buyurtma yuborish funksiyasi
export async function sendOrderToPoster(orderData) {
  try {
    const products = orderData.items.map(item => ({
      product_id: item.id,
      count: item.qty
    }));

    const payload = {
      // TOKENNI SHU YERGA YOZING:
      token: "055111:3778171b3c1d7a42913c53dd8cdd9326", 
      spot_id: 1,
      phone: orderData.phone,
      first_name: orderData.name || '',
      service_mode: 3,
      client_address: `${orderData.district}, ${orderData.addr} ${orderData.house}. Mo'ljal: ${orderData.landmark}`,
      products: products
    };

    // Xatoni ushlash uchun console.log qo'shamiz
    console.log("Poster'ga yuborilayotgan ma'lumotlar:", JSON.stringify(payload));

    const response = await axios.post('https://joinposter.com/api/incomingOrders.createIncomingOrder', payload);
    
    console.log("Poster javobi:", response.data);

    return { 
      success: true, 
      data: response.data,
      transaction_id: response.data.response?.incoming_order_id || null 
    };

  } catch (error) {
    console.error('❌ POSTER XATOSI:', error.response ? JSON.stringify(error.response.data) : error.message);
    return { success: false, error: error.response ? error.response.data : error.message };
  }
}

// 2. Chekni o'chirish funksiyasi
export async function removePosterTransaction(transactionId) {
  if (!transactionId) return { success: false, reason: 'no_id' };

  try {
    const payload = {
      token: "055111:3778171b3c1d7a42913c53dd8cdd9326", // Tokenni shu yerga ham yozing
      spot_tablet_id: 1,
      transaction_id: transactionId,
      user_id: 4
    };

    const response = await axios.post('https://joinposter.com/api/transactions.removeTransaction', payload);
    return response.data && response.data.response === true ? { success: true } : { success: false, error: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}