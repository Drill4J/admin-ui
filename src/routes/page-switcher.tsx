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
import { Switch, Route, Redirect } from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';

import { AppLayout } from 'layouts';
import {
  LoginPage,
  AgentsPage,
  NotFoundPage,
  AgentFullPage,
  SettingsPage,
  AgentRegistrationPage,
  ServiceGroupFullPage,
  ServiceGroupRegistrationPage,
} from 'pages';
import {
  PrivateRoute, Sidebar, Footer,
} from 'components';

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
      footer={<Footer />}
    >
      <Switch>
        <PrivateRoute exact path={['/agents', '/agents/notification-sidebar']} component={AgentsPage} />
        <PrivateRoute exact path={['/agents/:type/:id/settings/:tab', '/agents/:type/:id/settings/:tab/:panel']} component={SettingsPage} />
        <PrivateRoute exact path="/registration/:agentId" component={AgentRegistrationPage} />
        <PrivateRoute path="/bulk-registration/:serviceGroupId" component={ServiceGroupRegistrationPage} />
        <PrivateRoute path="/preregister/offline-agent" component={AgentRegistrationPage} />
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    </AppLayout>
  </Switch>
);
