import { authAPI } from '.';

export async function login(email, password) {
  try {
    const response = await authAPI.post('login/admin', { email, password });
    return response.data;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function register(email, password) {
  try {
    const response = await authAPI.post('register/admin', { email, password });
    return response.data;
  } catch (error) {
    console.warn(error);
    return null;
  }
}
