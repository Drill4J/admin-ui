import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Switch, withRouter, RouteComponentProps, Route, matchPath } from 'react-router-dom';

import { Toolbar, Icons, Footer } from '../../components';
import { PluginsLayout, Panel } from '../../layouts';
import { CoveragePlugin } from './coverage-plugin';
import { useAgent } from '../../hooks';
import { PluginProvider } from './store';
import { PluginHeader } from './plugin-header';
import { Breadcrumbs } from './breadcrumbs';
import { Dashboard } from './dashboard';
import { BuildList } from './build-list';
import { Sidebar } from './sidebar';
import { InitialConfigController } from './initial-config-controller';
import { NewBuildModal } from './new-build-modal';
import { useNotification } from './use-notification';

import styles from './agent-full-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentFullPage = BEM(styles);

const pluginsLinks = [
  {
    id: 'dashboard',
    link: 'dashboard',
    icon: Icons.Dashboard,
    computed: true,
  },
  {
    id: 'test-to-code-mapping',
    link: 'test-to-code-mapping/dashboard',
    icon: Icons.Coverage,
    computed: true,
  },
];

export const AgentFullPage = withRouter(
  agentFullPage(
    ({
      className,
      match: {
        params: { agentId },
      },
      history,
      location: { pathname },
    }: Props) => {
      const agent = useAgent(agentId, () => history.push('/not-found')) || {};
      const path = '/:page/:agentId/:buildVersion/:activeLink';
      const { params: { activeLink = '' } = {} } =
        matchPath<{ activeLink: string }>(pathname, {
          path,
        }) || {};
      const notification = useNotification() || {};
      const [isNewBuildModalOpened, setIsNewBuildModalOpened] = React.useState(false);
      React.useEffect(() => {
        if (notification.status === 'UNREAD' && notification.agentId === agentId) {
          setIsNewBuildModalOpened(true);
        }
      }, [notification, agentId]);

      return (
        <PluginProvider>
          <InitialConfigController>
            <PluginsLayout
              sidebar={activeLink && <Sidebar links={pluginsLinks} matchParams={{ path }} />}
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
              header={
                <PluginHeader
                  agentName={agent.name}
                  agentStatus={agent.status}
                  agentIPAddress={agent.ipAddress}
                />
              }
              breadcrumbs={<Breadcrumbs />}
              footer={<Footer />}
            >
              <div className={className}>
                <Switch>
                  <Route
                    path="/full-page/:agentId/:buildVersion/test-to-code-mapping/:tab"
                    component={CoveragePlugin}
                  />
                  <Route
                    path="/full-page/:agentId/:buildVersion/dashboard"
                    render={() => <Dashboard agent={agent} />}
                  />
                  <Route path="/full-page/:agentId/build-list" component={BuildList} />
                </Switch>
                {isNewBuildModalOpened && (
                  <NewBuildModal
                    isOpen={isNewBuildModalOpened}
                    onToggle={setIsNewBuildModalOpened}
                    notification={notification}
                  />
                )}
              </div>
            </PluginsLayout>
          </InitialConfigController>
        </PluginProvider>
      );
    },
  ),
);

const ArrowBackLabel = agentFullPage.arrowBackIcon('span');
