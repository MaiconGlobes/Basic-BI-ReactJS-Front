import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'simplebar/src/simplebar.css';
import { Provider as ReduxProvider } from 'react-redux';
import 'assets/third-party/apex-chart.css';
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';
// import axiosInstance from './axiosConfig';

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Faça algo antes de enviar a requisição, se necessário
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
reportWebVitals();
