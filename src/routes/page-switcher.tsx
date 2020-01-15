import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AppLayout } from 'layouts';
import {
  LoginPage,
  AgentsPage,
  PluginsPage,
  LogsPage,
  ApplicationSettingsPage,
  NotFoundPage,
  AgentFullPage,
  SettingsPage,
  AgentRegistrationPage,
  ServiceGroupFullPage,
} from 'pages';
import { PrivateRoute, Icons, Sidebar, Toolbar, Footer } from 'components';

const sidebarLinks = [
  { link: 'agents', icon: Icons.Agents },
  { link: 'plugins', icon: Icons.Plugins },
  { link: 'logs', icon: Icons.Logs },
  { link: 'settings', icon: Icons.NewSettings },
];

export const PageSwitcher = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" render={() => <Redirect to="/agents" />} />
      <Route path="/full-page/:agentId" component={AgentFullPage} />
      <Route path="/service-group-full-page/:id" component={ServiceGroupFullPage} />
      <AppLayout
        sidebar={<Sidebar links={sidebarLinks} matchParams={{ path: '/:activeLink' }} />}
        toolbar={<Toolbar />}
        footer={<Footer />}
      >
        <Switch>
          <PrivateRoute exact path="/agents" component={AgentsPage} />
          <PrivateRoute exact path="/agents/:type/:id/settings" component={SettingsPage} />
          <PrivateRoute exact path="/plugins" component={PluginsPage} />
          <PrivateRoute exact path="/logs" component={LogsPage} />
          <PrivateRoute exact path="/settings" component={ApplicationSettingsPage} />
          <PrivateRoute exact path="/registration/:agentId" component={AgentRegistrationPage} />
          <PrivateRoute component={NotFoundPage} />
        </Switch>
      </AppLayout>
    </Switch>
  );
};
