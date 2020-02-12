import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Switch, withRouter, RouteComponentProps, Route, matchPath,
} from 'react-router-dom';

import { Toolbar, Icons, Footer } from 'components';
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

interface Props extends RouteComponentProps<{ id: string; pluginId: string }> {
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

export const ServiceGroupFullPage = withRouter(
  serviceGroupFullPage(
    ({
      className,
      match: {
        params: { id, pluginId },
      },
      location: { pathname },
    }: Props) => {
      const plugins = useWsConnection<Plugin[]>(
        defaultAdminSocket,
        `/service-group/${id}/plugins`,
      ) || [];
      const serviceGroup = usePluginData<ServiceGroupSummary>(id, pluginId) || {};
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
                      aggregatedData={serviceGroup.aggregatedData}
                    />
                  )}
                />
              </Switch>
            </Content>
          </div>
        </PluginsLayout>
      );
    },
  ),
);

const Content = serviceGroupFullPage.content('div');
