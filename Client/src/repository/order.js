import { appAPI } from '.';

export async function getOrderById(id) {
  try {
    const response = await appAPI.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getOrders(
  customerName = '',
  customerEmail = '',
  itemName = '',
  createdAt = null,
  limit = 20,
  page = 1
) {
  try {
    const response = await appAPI.get('/order', {
      params: { customerName, customerEmail, itemName, createdAt, limit, page }
    });
    return response.data.orders;
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

export async function getOrderByCustomerName(name) {
  try {
    const response = await appAPI.get('/order/name', {params: {name}});
    return response.data;
  }
  catch (error) {
    return null;
  }
}

export async function getOrderByCustomerEmail(email) {
  try {
    const response = await appAPI.get('/order/email', {params: {email}});
    return response.data;
  }
  catch (error) {
    return null;
  }
}

export async function getOrderByCustomerDate(date) {
  try {
    const response = await appAPI.get('/order/date', {params: {date}});
    return response.data;
  }
  catch (error) {
    return null;
  }
}