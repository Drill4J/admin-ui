import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AppLayout } from '../layouts';
import { LoginPage, AgentsPage, PluginsPage, LogsPage, SettingsPage, NotFoundPage } from '../pages';
import { PrivateRoute, Icons, Sidebar, Toolbar } from '../components';

const sidebarLinks = [
  { link: '', icon: Icons.Agents },
  { link: 'plugins', icon: Icons.Plugins },
  { link: 'logs', icon: Icons.Logs },
  { link: 'settings', icon: Icons.Settings },
];

export const PageSwitcher = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <AppLayout sidebar={<Sidebar links={sidebarLinks} />} toolbar={<Toolbar />}>
        <Switch>
          <PrivateRoute exact path="/" component={AgentsPage} />
          <PrivateRoute exact path="/plugins" component={PluginsPage} />
          <PrivateRoute exact path="/logs" component={LogsPage} />
          <PrivateRoute exact path="/settings" component={SettingsPage} />
          <PrivateRoute component={NotFoundPage} />
        </Switch>
      </AppLayout>
    </Switch>
  );
};
