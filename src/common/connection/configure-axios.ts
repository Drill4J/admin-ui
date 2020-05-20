import axios from 'axios';

import { TOKEN_HEADER, TOKEN_KEY } from '../constants';

export function configureAxios() {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST ? `http://${process.env.REACT_APP_API_HOST}/api` : '/api';

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (token) {
        // eslint-disable-next-line no-param-reassign
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
