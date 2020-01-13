import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Switch, withRouter, RouteComponentProps, Route, matchPath } from 'react-router-dom';

import { Toolbar, Icons, Footer } from 'components';
import { defaultAdminSocket } from 'common/connection';
import { PluginsLayout, Panel } from 'layouts';
import { useWsConnection } from 'hooks';
import { ServiceGroupDashboard } from './service-group-dashboard';
import { Sidebar } from '../agent-full-page/sidebar';
import { ServiceGroupHeader } from './service-group-header';
import { ServiceGroupSummary } from 'types/service-group-summary';

import styles from './service-group-full-page.module.scss';

interface Props extends RouteComponentProps<{ id: string }> {
  className?: string;
}

const serviceGroupFullPage = BEM(styles);

const getPluginsList = (serviceGroupId: string) => [
  {
    id: 'service-group-dashboard',
    link: `service-group-full-page/${serviceGroupId}/service-group-dashboard`,
    icon: Icons.Dashboard,
  },
];

export const ServiceGroupFullPage = withRouter(
  serviceGroupFullPage(
    ({
      className,
      match: {
        params: { id },
      },
      history,
      location: { pathname },
    }: Props) => {
      const serviceGroup =
        useWsConnection<ServiceGroupSummary>(
          defaultAdminSocket,
          `/service-group/${id}/plugin/test-to-code-mapping`,
        ) || {};
      const path = '/:page/:serviceGroupId/:activeLink';
      const { params: { activeLink = '' } = {} } =
        matchPath<{ activeLink: string }>(pathname, {
          path,
        }) || {};

      return (
        <PluginsLayout
          sidebar={activeLink && <Sidebar links={getPluginsList(id)} matchParams={{ path }} />}
          toolbar={
            <Toolbar
              breadcrumbs={
                <Panel>
                  <ArrowBackLabel onClick={() => history.push('/agents')}>
                    {'<  Back to Admin'}
                  </ArrowBackLabel>
                </Panel>
              }
            />
          }
          header={<ServiceGroupHeader serviceGroup={serviceGroup} />}
          footer={<Footer />}
        >
          <div className={className}>
            <Content>
              <Switch>
                <Route
                  path="/service-group-full-page/:serviceGroupId/service-group-dashboard"
                  render={() => (
                    <ServiceGroupDashboard
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

const ArrowBackLabel = serviceGroupFullPage.arrowBackIcon('span');
const Content = serviceGroupFullPage.content('div');
