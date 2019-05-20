import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageSwitcher } from './routes';
import { NotificationManager } from './notification-manager';
import { configureAxios } from './common/connection';

configureAxios();

export const App = () => (
  <Router>
    <NotificationManager>
      <PageSwitcher />
    </NotificationManager>
  </Router>
);
