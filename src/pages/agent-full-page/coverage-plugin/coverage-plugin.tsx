import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Switch, Route } from 'react-router-dom';

import { Overview } from './overview';
import { ScopesList, ScopeInfo } from './scope';
import { Tests } from './tests';
import { CoveragePluginModals } from './covarage-plugin-modals';
import { CoveragePluginProvider } from './store';
import { InitialDataController } from './initial-data-controller';

import styles from './coverage-plugin.module.scss';

interface Props {
  className?: string;
}

const coveragePlugin = BEM(styles);

export const CoveragePlugin = coveragePlugin(({ className }: Props) => (
  <div className={className}>
    <CoveragePluginProvider>
      <InitialDataController>
        <>
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
));

const Content = coveragePlugin.content('div');
