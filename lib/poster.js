import axios from 'axios';

// Tokenni faqat Vercel'dagi Environment Variables (process.env) dan o'qiymiz
const POSTER_TOKEN = process.env.POSTER_TOKEN;

// 1. Buyurtma yuborish funksiyasi
export async function sendOrderToPoster(orderData) {
  if (!POSTER_TOKEN) {
    console.error("❌ Xato: POSTER_TOKEN topilmadi! Vercel sozlamalarini tekshiring.");
    return { success: false, reason: 'no_token' };
  }

  const payload = {
    token: POSTER_TOKEN,
    spot_id: 1,
    phone: orderData.phone,
    first_name: orderData.name || '',
    service_mode: 3,
    client_address: `${orderData.district}, ${orderData.addr} ${orderData.house}. Mo'ljal: ${orderData.landmark}`,
    products: orderData.items.map(item => ({
      product_id: Number(item.id), 
      count: item.qty
    }))
  };

  try {
    const url = `https://joinposter.com/api/incomingOrders.createIncomingOrder?token=${POSTER_TOKEN}`;
    const response = await axios.post(url, payload);
    
    return { 
      success: true, 
      data: response.data,
      incoming_order_id: response.data.response?.incoming_order_id || null,
      transaction_id: response.data.response?.transaction_id || null 
    };
  } catch (error) {
    console.error('❌ POSTER XATOSI:', error.response ? JSON.stringify(error.response.data) : error.message);
    return { success: false, error: error.response ? error.response.data : error.message };
  }
}

// 2. Chekni (Tranzaksiyani) o'chirish funksiyasi
export async function removePosterTransaction(transactionId) {
  if (!POSTER_TOKEN) return { success: false };
  if (!transactionId) return { success: false };
  
  try {
    const url = `https://joinposter.com/api/transactions.removeTransaction?token=${POSTER_TOKEN}`;
    
    const response = await axios.post(url, {
      spot_tablet_id: 1,
      transaction_id: Number(transactionId), 
      user_id: 4 
    });
    
    console.log("O'chirish javobi:", response.data);
    return { success: true };
  } catch (error) {
    console.error("O'chirishda xato:", error.response ? error.response.data : error.message);
    return { success: false };
  }
}