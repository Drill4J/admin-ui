import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Switch, withRouter, RouteComponentProps, Route } from 'react-router-dom';

import { Toolbar } from '../../components';
import { PluginsLayout, Panel } from '../../layouts';
import { CoveragePlugin } from './coverage-plugin';
import { useAgent } from '../../hooks';
import { PluginProvider } from './store';
import { PluginHeader } from './plugin-header';
import { Breadcrumbs } from './breadcrumbs';
import { Dashboard } from './dashboard';
import { BuildList } from './build-list';

import styles from './agent-full-page.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const agentFullPage = BEM(styles);

export const AgentFullPage = withRouter(
  agentFullPage(({ className, match: { params: { agentId } }, history }: Props) => {
    const agent = useAgent(agentId, () => history.push('/not-found')) || {};

    return (
      <PluginProvider>
        <PluginsLayout
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
          header={<PluginHeader agentName={agent.name} />}
          breadcrumbs={<Breadcrumbs />}
        >
          <div className={className}>
            <Switch>
              <Route
                path="/full-page/:agentId/test-to-code-mapping/:tab"
                render={() => <CoveragePlugin agent={agent} />}
              />
              <Route path="/full-page/:agentId/dashboard" component={Dashboard} />
              <Route path="/full-page/:agentId/build-list" component={BuildList} />
            </Switch>
          </div>
        </PluginsLayout>
      </PluginProvider>
    );
  }),
);

const ArrowBackLabel = agentFullPage.arrowBackIcon('span');
