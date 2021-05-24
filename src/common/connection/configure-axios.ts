/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import axios from 'axios';

import { TOKEN_HEADER, TOKEN_KEY } from '../constants';

export function configureAxios() {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST
    ? `http://${process.env.REACT_APP_API_HOST}/api`
    : '/api';

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
