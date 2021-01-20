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
import { devirt } from '@redneckz/react-devirt';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageSwitcher } from './routes';
import { NotificationManager } from './notification-manager';
import { configureAxios } from './common/connection';

import './app.scss';

if (process.env.REACT_APP_ENV === 'development') {
  devirt();
}

configureAxios();

export const App = () => (
  <Router>
    <NotificationManager>
      <PageSwitcher />
    </NotificationManager>
  </Router>
);
