import axios from 'axios';
import Cookies from 'js-cookie';
import { handleNavigate } from './NavigationContext';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:5005', 
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    //  'Authorization' : `Bearer `,
  },
});

instanceAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('_hasch_tk'); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    if (!response.config.url.includes('/login')) {
      switch (response?.data?.retorno?.codigo_status) {
        case 98: {
          Cookies.remove('_hasch_tk');
          handleNavigate('/login'); 
          break;
        }
        case 3:
          console.log('sucesso... [interceptor ok]');
          break;
        default:
          break;
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instanceAxios;
