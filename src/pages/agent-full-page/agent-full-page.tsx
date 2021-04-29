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
import {
  Switch, useLocation, useParams, Route, matchPath,
} from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';

import { Toolbar, Footer } from 'components';
import { PluginsLayout } from 'layouts';
import { Breadcrumbs } from 'modules';
import { useAgent } from 'hooks';
import { Plugin } from 'types/plugin';
import { CoveragePlugin } from './coverage-plugin';
import { PluginProvider } from './store';
import { PluginHeader } from './plugin-header';
import { Dashboard } from './dashboard';
import { BuildList } from './build-list';
import { Sidebar } from './sidebar';
import { InitialConfigController } from './initial-config-controller';

interface Link {
  id: string;
  link: string;
  name: keyof typeof Icons;
  computed: boolean;
}

const getPluginsLinks = (plugins: Plugin[] = []): Link[] => ([
  {
    id: 'dashboard',
    link: 'dashboard',
    name: 'Dashboard',
    computed: true,
  },
  ...plugins.map(({ id = '', name }) => ({
    id, link: id === 'test2code' ? `${id}/dashboard/methods` : `${id}/dashboard`, name: name as keyof typeof Icons, computed: true,
  })),
]);

export const AgentFullPage = () => {
  const { agentId = '' } = useParams<{ agentId: string }>();
  const { pathname } = useLocation();
  const agent = useAgent(agentId) || {};
  const path = '/:page/:agentId/:buildVersion/:activeLink';
  const { params: { activeLink = '' } = {} } = matchPath<{ activeLink: string }>(pathname, {
    path,
  }) || {};

  return (
    <PluginProvider>
      <InitialConfigController>
        <PluginsLayout
          sidebar={activeLink && activeLink !== 'notification-sidebar'
          && <Sidebar links={getPluginsLinks(agent.plugins)} matchParams={{ path }} />}
          toolbar={(
            <Toolbar
              breadcrumbs={<Breadcrumbs />}
            />
          )}
          header={<PluginHeader agentName={agent.name} agentStatus={agent.status} />}
          footer={<Footer />}
        >
          <div tw="w-full h-full">
            <Switch>
              <Route
                path={['/full-page/:agentId/:buildVersion/dashboard', '/full-page/:agentId/:buildVersion/dashboard/notification-sidebar']}
                render={() => <Dashboard agent={agent} />}
                exact
              />
              <Route path="/full-page/:agentId/build-list" component={BuildList} />
              <Route
                path="/full-page/:agentId/:buildVersion/:pluginId/:tab"
                component={CoveragePlugin}
              />
            </Switch>
          </div>
        </PluginsLayout>
      </InitialConfigController>
    </PluginProvider>
  );
};
