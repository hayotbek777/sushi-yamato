import axios from 'axios';

// TOKENNI SHU YERGA YOZING
const POSTER_TOKEN = "055111:3778171b3c1d7a42913c53dd8cdd9326";

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
    
    return { 
      success: true, 
      data: response.data,
      incoming_order_id: response.data.response?.incoming_order_id || null 
    };
  } catch (error) {
    console.error('❌ POSTER XATOSI:', error.response ? error.response.data : error.message);
    return { success: false, error: error.response ? error.response.data : error.message };
  }
}

// Onlayn buyurtmani o'chirish
export async function removeIncomingOrder(incomingOrderId) {
  if (!incomingOrderId) return { success: false };
  try {
    // Diqqat: incoming_order_id ni URL ga qo'shamiz
    const url = `https://joinposter.com/api/incomingOrders.removeIncomingOrder?token=${POSTER_TOKEN}&incoming_order_id=${incomingOrderId}`;
    const response = await axios.post(url);
    console.log("O'chirish javobi:", response.data);
    return { success: true };
  } catch (error) {
    console.error("O'chirishda xato:", error.response ? error.response.data : error.message);
    return { success: false };
  }
}