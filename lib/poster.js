import axios from 'axios';

// 1. Buyurtma yuborish funksiyasi
export async function sendOrderToPoster(orderData) {
  try {
    const products = orderData.items.map(item => ({
      product_id: item.id,
      count: item.qty
    }));

    const payload = {
      token: process.env.POSTER_TOKEN || "SIZNING_HAQIQIY_TOKENINGIZNI_SHU_YERGA_YOZING",
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

// 2. Chekni o'chirish funksiyasi
export async function removePosterTransaction(transactionId) {
  if (!transactionId) {
    return { success: false, reason: 'no_id' };
  }

  try {
    const payload = {
      token: process.env.POSTER_TOKEN || "SIZNING_HAQIQIY_TOKENINGIZNI_SHU_YERGA_YOZING",
      spot_tablet_id: 1, // Kassa ID
      transaction_id: transactionId,
      user_id: 4 // Xodim ID
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