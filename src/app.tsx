import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageSwitcher } from './routes';
import { configureAxios } from './common/connection';

configureAxios();

export const App = () => (
  <Router>
    <PageSwitcher />
  </Router>
);
