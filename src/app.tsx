import * as React from 'react';
import { devirt } from '@redneckz/react-devirt';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageSwitcher } from './routes';
import { NotificationManager } from './notification-manager';
import { configureAxios } from './common/connection';

if (process.env.NODE_ENV === 'development') {
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
