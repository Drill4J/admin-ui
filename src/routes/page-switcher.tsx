import { Switch, Route, Redirect } from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';

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
  ServiceGroupRegistrationPage,
} from 'pages';
import {
  PrivateRoute, Sidebar, Toolbar, Footer,
} from 'components';
import { Breadcrumbs } from 'modules';

const sidebarLinks = [
  { link: 'agents', icon: Icons.Agents },
];

export const PageSwitcher = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/" render={() => <Redirect to="/agents" />} />
    <Route path="/full-page/:agentId" component={AgentFullPage} />
    <Route path="/service-group-full-page/:id/:pluginId" component={ServiceGroupFullPage} />
    <AppLayout
      sidebar={<Sidebar links={sidebarLinks} matchParams={{ path: '/:activeLink' }} />}
      toolbar={<Toolbar breadcrumbs={<Breadcrumbs />} />}
      footer={<Footer />}
    >
      <Switch>
        <PrivateRoute exact path="/agents" component={AgentsPage} />
        <PrivateRoute exact path="/agents/:type/:id/settings" component={SettingsPage} />
        <PrivateRoute exact path="/plugins" component={PluginsPage} />
        <PrivateRoute exact path="/logs" component={LogsPage} />
        <PrivateRoute exact path="/settings" component={ApplicationSettingsPage} />
        <PrivateRoute exact path="/registration/:agentId" component={AgentRegistrationPage} />
        <PrivateRoute path="/bulk-registration/:serviceGroupId" component={ServiceGroupRegistrationPage} />
        <PrivateRoute path="/preregister/offline-agent" component={AgentRegistrationPage} />
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    </AppLayout>
  </Switch>
);
