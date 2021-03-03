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
import { BEM } from '@redneckz/react-bem-helper';
import { Switch, Route } from 'react-router-dom';

import { TestsToRunList } from 'modules';
import { Overview } from './overview';
import { ScopesList, ScopeInfo } from './scope';
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
                path="/full-page/:agentId/:buildVersion/:pluginId/tests-to-run"
                component={TestsToRunList}
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
