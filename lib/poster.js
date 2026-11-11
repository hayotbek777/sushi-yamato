import axios from 'axios';

export async function sendOrderToPoster(orderData) {
  // TOKENNI SHU YERGA YOZING (Qo'shtirnoq ichiga):
  const POSTER_TOKEN = "055111:3778171b3c1d7a42913c53dd8cdd9326"; 

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

  console.log("=== YUBORILAYOTGAN MA'LUMOT ===");
  console.log(JSON.stringify(payload));

  try {
    // TOKENNI URL MANZILIGA HAM QO'SHAMIZ
    const url = `https://joinposter.com/api/incomingOrders.createIncomingOrder?token=${POSTER_TOKEN}`;
    
    const response = await axios.post(url, payload);
    
    console.log("=== POSTER JAVOBI ===");
    console.log(JSON.stringify(response.data));
    
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

export async function removePosterTransaction(transactionId) {
  const POSTER_TOKEN = "055111:3778171b3c1d7a42913c53dd8cdd9326"; // Bu yerga ham yozing
  
  if (!transactionId) return { success: false, reason: 'no_id' };

  try {
    const url = `https://joinposter.com/api/transactions.removeTransaction?token=${POSTER_TOKEN}`;
    const response = await axios.post(url, {
      spot_tablet_id: 1,
      transaction_id: transactionId,
      user_id: 4
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}