import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AppLayout } from '../layouts';
import {
  LoginPage,
  AgentsPage,
  PluginsPage,
  LogsPage,
  SettingsPage,
  NotFoundPage,
  AgentInfoPage,
  AgentFullPage,
  AgentSettingsPage,
  AgentRegistrationPage,
} from '../pages';
import { PrivateRoute, Icons, Sidebar, Toolbar, Divider, Footer } from '../components';

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
      <AppLayout
        sidebar={<Sidebar links={sidebarLinks} matchParams={{ path: '/:activeLink' }} />}
        toolbar={
          <Toolbar>
            <Icons.Notification />
            <Divider />
            <Icons.Account />
            <span>Guest</span>
          </Toolbar>
        }
        footer={<Footer />}
      >
        <Switch>
          <PrivateRoute exact path="/agents" component={AgentsPage} />
          <PrivateRoute exact path="/agents/:agentId" component={AgentInfoPage} />
          <PrivateRoute exact path="/agents/:agentId/settings" component={AgentSettingsPage} />
          <PrivateRoute exact path="/plugins" component={PluginsPage} />
          <PrivateRoute exact path="/logs" component={LogsPage} />
          <PrivateRoute exact path="/settings" component={SettingsPage} />
          <PrivateRoute exact path="/registration/:agentId" component={AgentRegistrationPage} />
          <PrivateRoute component={NotFoundPage} />
        </Switch>
      </AppLayout>
    </Switch>
  );
};
