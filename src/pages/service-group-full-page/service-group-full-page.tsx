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
import 'twin.macro';
import {
  Switch, useParams, useLocation, Route, matchPath,
} from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';

import { Toolbar, Footer } from 'components';
import { defaultAdminSocket } from 'common/connection';
import { PluginsLayout } from 'layouts';
import { Breadcrumbs } from 'modules';
import { useWsConnection } from 'hooks';
import { ServiceGroupSummary } from 'types/service-group-summary';
import { Plugin } from 'types/plugin';
import { TestToCodePlugin } from './test-to-code-plugin';
import { Sidebar } from '../agent-full-page/sidebar';
import { ServiceGroupHeader } from './service-group-header';
import { usePluginData } from './use-plugin-data';
import { Dashboard } from './dashboard';

interface Link {
  id: string;
  link: string;
  name: keyof typeof Icons;
  computed?: boolean;
}

const getPluginsList = (serviceGroupId: string, plugins: Plugin[]): Link[] => [
  {
    id: 'service-group-dashboard',
    link: `service-group-full-page/${serviceGroupId}/service-group-dashboard`,
    name: 'Dashboard',
  },
  ...plugins.map(({ id = '', name = '' }) => ({
    id,
    link: `service-group-full-page/${serviceGroupId}/${id}`,
    name: name as keyof typeof Icons,
  })),
];

export const ServiceGroupFullPage = () => {
  const { id = '', pluginId = '' } = useParams<{ id: string, pluginId: string }>();
  const { pathname } = useLocation();
  const plugins = useWsConnection<Plugin[]>(
    defaultAdminSocket,
    `/groups/${id}/plugins`,
  ) || [];
  const serviceGroup = usePluginData<ServiceGroupSummary>('/group/summary', id, pluginId) || {};
  const path = '/:page/:serviceGroupId/:activeLink';
  const { params: { activeLink = '' } = {} } = matchPath<{ activeLink: string }>(pathname, {
    path,
  }) || {};

  return (
    <PluginsLayout
      sidebar={activeLink && <Sidebar links={getPluginsList(id, plugins)} matchParams={{ path }} />}
      toolbar={(
        <Toolbar
          breadcrumbs={<Breadcrumbs />}
        />
      )}
      header={<ServiceGroupHeader serviceGroup={serviceGroup} />}
      footer={<Footer />}
    >
      <div tw="w-full h-full">
        <div tw="h-full mx-6">
          <Switch>
            <Route
              path="/service-group-full-page/:serviceGroupId/service-group-dashboard"
              render={() => (
                <Dashboard
                  serviceGroupId={id}
                  plugins={plugins.filter(plugin => !plugin.available)}
                />
              )}
            />
            <Route
              path="/service-group-full-page/:serviceGroupId/:pluginId"
              render={() => (
                <TestToCodePlugin
                  summaries={serviceGroup.summaries}
                  aggregated={serviceGroup.aggregated}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </PluginsLayout>
  );
};
