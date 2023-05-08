import { authAPI } from '.';

export async function getCustomerById(id) {
  try {
    const response = await authAPI.get(`/customer/${id}`);
    return response;
  }
  catch(error) {
    console.warn(error);
    return null;
  }
}

export async function getBlockedCustomers(limit = 20, page = 1) {
  try {
    const response = await authAPI.get('/customers', {
      params: { blocked: true, limit, page }
    });
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function getRecentCustomers(limit = 20, page = 1) {
  try {
    const response = await authAPI.get('/customers?blocked=false', {
      params: { limit, page, sortField: 'createdAt', sortOrder: 'desc' }
    });
    return response.data.customers;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function createCustomer(customer) {
  try {
    const response = await authAPI.post('/customer', [customer]);
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function updateCustomer(customer) {
  try {
    const response = await authAPI.patch(`/customer/:${customer.id}`, [customer]);
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function blockCustomer(id, value = true) {
  try {
    const response = await authAPI.patch(`/customer/:${id}`, { blocked: value });
    return response.data.customers;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function deleteCustomer(id) {
  try {
    const response = await authAPI.delete(`/customer/:${id}`);
    return response;
  }
  catch (error) {
    console.warn(error)
    return null;
  }
}