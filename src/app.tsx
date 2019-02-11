import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageSwitcher } from './routes';

export const App = () => (
  <Router>
    <PageSwitcher />
  </Router>
);
