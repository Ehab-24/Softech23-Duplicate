import axios from 'axios';

const appAPI = axios.create({
  baseURL: 'https://localhost:4000/api/',
  timeout: 5000,
  headers: { 'Authentication': 'Bearer' }
});

export { appAPI };
