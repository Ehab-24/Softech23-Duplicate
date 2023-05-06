import { appAPI } from '.';

export async function getOrderById(id = '') {
  try {
    const response = await appAPI.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getOrders(
  customerName,
  customerEmail,
  itemName,
  createdAt,
  limit = 20,
  page = 1
) {
  try {
    const response = await appAPI.get('/order', {
      params: { customerName, customerEmail, itemName, createdAt, limit, page }
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function createOrder(order) {
  try {
    const response = await appAPI.post('/order', [order]);
    return response;
  } catch (error) {
    return null;
  }
}

export async function updateOrder(order) {
  try {
    const response = await appAPI.patch(`/order/:${order.id}`, [order]);
    return response;
  } catch (error) {
    return null;
  }
}

export async function deleteOrder(order) {
  try {
    const response = await appAPI.delete(`/order/:${order.id}`);
    return response;
  } catch (error) {
    return null;
  }
}
