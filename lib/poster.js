import axios from 'axios';

// TOKENNI SHU YERGA YOZING:
const POSTER_TOKEN = "055111:3778171b3c1d7a42913c53dd8cdd9326";

// 1. Buyurtma yuborish
export async function sendOrderToPoster(orderData) {
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
    
    // MUHIM: Ikkala ID ni ham qaytaramiz
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

// 2. Chekni (Tranzaksiyani) o'chirish
export async function removePosterTransaction(transactionId) {
  if (!transactionId) return { success: false };
  
  try {
    const url = `https://joinposter.com/api/transactions.removeTransaction?token=${POSTER_TOKEN}`;
    
    const response = await axios.post(url, {
      spot_tablet_id: 1, // Kassa ID
      transaction_id: Number(transactionId), // Butun songa aylantiramiz
      user_id: 4 // Xodim ID
    });
    
    console.log("O'chirish javobi:", response.data);
    return { success: true };
  } catch (error) {
    console.error("O'chirishda xato:", error.response ? error.response.data : error.message);
    return { success: false };
  }
}