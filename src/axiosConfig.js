import axios from 'axios';
import Cookies from 'js-cookie';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:5005', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
     'Authorization' : `Bearer `,
  },
});

instanceAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('_hasch_tk'); 

      // console.log('passou aqui: ' + token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instanceAxios;
