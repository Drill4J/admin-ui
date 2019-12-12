import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Switch, Route } from 'react-router-dom';

import { CoveragePluginHeader } from './coverage-plugin-header';
import { Overview } from './overview';
import { ScopesList, ScopeInfo } from './scope';
import { Tests } from './tests';
import { CoveragePluginModals } from './covarage-plugin-modals';
import { CoveragePluginProvider } from './store';
import { InitialDataController } from './initial-data-controller';
import { Agent } from 'types/agent';

import styles from './coverage-plugin.module.scss';

interface Props {
  className?: string;
  agent?: Agent;
}

const coveragePlugin = BEM(styles);

export const CoveragePlugin = coveragePlugin(({ className }: Props) => {
  return (
    <div className={className}>
      <CoveragePluginProvider>
        <InitialDataController>
          <>
            <HeaderWrapper>
              <CoveragePluginHeader />
            </HeaderWrapper>
            <Content>
              <Switch>
                <Route
                  path="/full-page/:agentId/:buildVersion/:pluginId/dashboard"
                  component={Overview}
                  exact
                />
                <Route
                  path="/full-page/:agentId/:buildVersion/:pluginId/scopes"
                  component={ScopesList}
                  exact
                />
                <Route
                  path="/full-page/:agentId/:buildVersion/:pluginId/scopes/:scopeId"
                  component={ScopeInfo}
                  exact
                />
                <Route
                  path="/full-page/:agentId/:buildVersion/:pluginId/tests"
                  component={Tests}
                  exact
                />
              </Switch>
            </Content>
            <CoveragePluginModals />
          </>
        </InitialDataController>
      </CoveragePluginProvider>
    </div>
  );
});

const HeaderWrapper = coveragePlugin.header('div');
const Content = coveragePlugin.content('div');
