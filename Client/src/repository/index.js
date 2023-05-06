import axios from 'axios';

const appAPI = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 5000,
  headers: { 'Authentication': 'Bearer' }
});

export { appAPI };
