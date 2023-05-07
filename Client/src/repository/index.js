import { useCookies } from 'react-cookie';
import axios from 'axios';

const appAPI = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 10000,
  headers: { Authentication: 'Bearer' }
});
appAPI.interceptors.request.use(function (config) {
  // const [cookie, setCookie, removeCookie] = useCookies(['x-access-token']);
  // config.headers.Authorization = cookie;
  return config;
});

const authAPI = axios.create({
  baseURL: 'http://localhost:4000/auth',
  timeout: 10000
});

export { appAPI, authAPI };
