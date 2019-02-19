import axios from 'axios';

import { TOKEN_HEADER, TOKEN_KEY } from '../constants';

const hosts: { [env: string]: string } = {
  local: 'http://localhost:8090',
  development: '/api',
  qa: '',
  prod: '',
};

export function configureAxios() {
  axios.defaults.baseURL = process.env.REACT_APP_ENV
    ? hosts[process.env.REACT_APP_ENV]
    : hosts.local;

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (token) {
        config.headers[TOKEN_HEADER] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.setItem(TOKEN_KEY, '');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      return Promise.reject(error);
    },
  );
}
