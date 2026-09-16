export async function placeOrder(orderData) {
  // Simulate network request latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Server-side validation check (simulates 422 Unprocessable Entity)
  if (!orderData.name || orderData.name.trim().length < 2) {
    const err = new Error('Validation failed: Full name must be at least 2 characters.');
    err.status = 422;
    err.fieldErrors = { name: 'Full name must be at least 2 characters.' };
    throw err;
  }

  if (!orderData.phone || !/^(09|07)\d{8}$/.test(orderData.phone.trim())) {
    const err = new Error('Validation failed: Invalid TeleBirr phone number.');
    err.status = 422;
    err.fieldErrors = { phone: 'Invalid TeleBirr phone format.' };
    throw err;
  }

  if (!orderData.area || orderData.area.trim() === '') {
    const err = new Error('Validation failed: Delivery area is required.');
    err.status = 422;
    err.fieldErrors = { area: 'Delivery area is required.' };
    throw err;
  }

  if (!orderData.total || orderData.total <= 0) {
    const err = new Error('Validation failed: Cart is empty.');
    err.status = 422;
    err.fieldErrors = { general: 'Order total must be greater than 0.' };
    throw err;
  }

  return {
    success: true,
    orderNumber: 'AE-' + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    total: orderData.total,
    customer: orderData.name,
    area: orderData.area,
    phone: orderData.phone,
    notes: orderData.notes || '',
  };
}

export default placeOrder;
