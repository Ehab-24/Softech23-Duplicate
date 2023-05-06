import { appAPI } from '.';

export async function getCustomerById(id) {
  try {
    const response = await appAPI.get(`/api/customer/${id}`);
    return response;
  }
  catch(error) {
    console.warn(error);
    return null;
  }
}

export async function getBlockedCustomers(limit = 20, page = 1) {
  try {
    const response = await appAPI.get('/customers', {
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
    const response = await appAPI.get('/customers', {
      params: { blocked: false, limit, page, sortField: 'createdAt', sortOrder: 'desc' }
    });
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function createCustomer(customer) {
  try {
    const response = await appAPI.post('/customers', [customer]);
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function updateCustomer(customer) {
  try {
    const response = await appAPI.patch(`/customers/:${customer.id}`, [customer]);
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function blockCustomer(id) {
  try {
    const response = await appAPI.patch(`/customers/:${id}`, { blocked: true });
    return response;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function deleteCustomer(id) {
  try {
    const response = await appAPI.delete(`/customers/:${id}`);
    return response;
  }
  catch (error) {
    console.warn(error)
    return null;
  }
}