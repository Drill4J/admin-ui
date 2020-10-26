import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
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

import styles from './service-group-full-page.module.scss';

interface Props {
  className?: string;
}

interface Link {
  id: string;
  link: string;
  icon: keyof typeof Icons;
  computed?: boolean;
}

const serviceGroupFullPage = BEM(styles);

const getPluginsList = (serviceGroupId: string, plugins: Plugin[]): Link[] => [
  {
    id: 'service-group-dashboard',
    link: `service-group-full-page/${serviceGroupId}/service-group-dashboard`,
    icon: 'Dashboard',
  },
  ...plugins.map(({ id = '', name = '' }) => ({
    id,
    link: `service-group-full-page/${serviceGroupId}/${id}`,
    icon: name as keyof typeof Icons,
  })),
];

export const ServiceGroupFullPage = serviceGroupFullPage(
  ({
    className,
  }: Props) => {
    const { id = '', pluginId = '' } = useParams<{ id: string, pluginId: string }>();
    const { pathname } = useLocation();
    const plugins = useWsConnection<Plugin[]>(
      defaultAdminSocket,
      `/service-groups/${id}/plugins`,
    ) || [];
    const serviceGroup = usePluginData<ServiceGroupSummary>('/service-group/summary', id, pluginId) || {};
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
        <div className={className}>
          <Content>
            <Switch>
              <Route
                path="/service-group-full-page/:serviceGroupId/service-group-dashboard"
                render={() => (
                  <Dashboard serviceGroupId={id} plugins={plugins} />
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
          </Content>
        </div>
      </PluginsLayout>
    );
  },
);

const Content = serviceGroupFullPage.content('div');
