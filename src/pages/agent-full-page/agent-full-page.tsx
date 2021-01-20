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
import { useEffect, useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Switch, useLocation, useParams, Route, matchPath,
} from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';

import { Toolbar, Footer } from 'components';
import { PluginsLayout } from 'layouts';
import { Breadcrumbs } from 'modules';
import { useAgent, useWsConnection } from 'hooks';
import { Plugin } from 'types/plugin';
import { Notification } from 'types/notificaiton';
import { defaultAdminSocket } from 'common/connection';
import { CoveragePlugin } from './coverage-plugin';
import { PluginProvider } from './store';
import { PluginHeader } from './plugin-header';
import { Dashboard } from './dashboard';
import { BuildList } from './build-list';
import { Sidebar } from './sidebar';
import { InitialConfigController } from './initial-config-controller';
import { NewBuildModal } from './new-build-modal';

import styles from './agent-full-page.module.scss';

interface Props {
  className?: string;
}

interface Link {
  id: string;
  link: string;
  name: keyof typeof Icons;
  computed: boolean;
}

const agentFullPage = BEM(styles);

const getPluginsLinks = (plugins: Plugin[] = []): Link[] => ([
  {
    id: 'dashboard',
    link: 'dashboard',
    name: 'Dashboard',
    computed: true,
  },
  ...plugins.map(({ id = '', name }) => ({
    id, link: `${id}/dashboard`, name: name as keyof typeof Icons, computed: true,
  })),
]);

export const AgentFullPage = agentFullPage(
  ({
    className,
  }: Props) => {
    const { agentId = '' } = useParams<{ agentId: string }>();
    const { pathname } = useLocation();
    const agent = useAgent(agentId) || {};
    const path = '/:page/:agentId/:buildVersion/:activeLink';
    const { params: { activeLink = '' } = {} } = matchPath<{ activeLink: string }>(pathname, {
      path,
    }) || {};
    const notifications = useWsConnection<Notification[]>(defaultAdminSocket, '/notifications') || [];
    const newBuildNotification = notifications.find((notification) => notification.agentId === agentId) || {};
    const [isNewBuildModalOpened, setIsNewBuildModalOpened] = useState(false);
    useEffect(() => {
      if (!newBuildNotification?.read && newBuildNotification?.agentId === agentId) {
        setIsNewBuildModalOpened(true);
      }
    }, [newBuildNotification, agentId]);

    return (
      <PluginProvider>
        <InitialConfigController>
          <PluginsLayout
            sidebar={activeLink && <Sidebar links={getPluginsLinks(agent.plugins)} matchParams={{ path }} />}
            toolbar={(
              <Toolbar
                breadcrumbs={<Breadcrumbs />}
              />
            )}
            header={<PluginHeader agentName={agent.name} agentStatus={agent.status} />}
            footer={<Footer />}
          >
            <div className={className}>
              <Switch>
                <Route
                  path="/full-page/:agentId/:buildVersion/dashboard"
                  render={() => <Dashboard agent={agent} />}
                  exact
                />
                <Route path="/full-page/:agentId/build-list" component={BuildList} />
                <Route
                  path="/full-page/:agentId/:buildVersion/:pluginId/:tab"
                  component={CoveragePlugin}
                />
              </Switch>
              {isNewBuildModalOpened && (
                <NewBuildModal
                  isOpen={isNewBuildModalOpened}
                  onToggle={setIsNewBuildModalOpened}
                  notification={newBuildNotification}
                />
              )}
            </div>
          </PluginsLayout>
        </InitialConfigController>
      </PluginProvider>
    );
  },
);
