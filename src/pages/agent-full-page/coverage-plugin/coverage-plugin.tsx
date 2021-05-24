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
import { Switch, Route } from 'react-router-dom';
import 'twin.macro';

import { SessionsManagementPaneProvider, TestsToRunList } from 'modules';
import { Overview } from './overview';
import { ScopesList, ScopeInfo } from './scope';
import { CoveragePluginModals } from './covarage-plugin-modals';
import { CoveragePluginProvider } from './store';
import { InitialDataController } from './initial-data-controller';
import { RisksModal } from './risks-modal';

export const CoveragePlugin = () => (
  <div tw="flex flex-col w-full h-full">
    <CoveragePluginProvider>
      <InitialDataController>
        <>
          <div tw="flex-grow mx-6">
            <Switch>
              <Route
                path="/full-page/:agentId/:buildVersion/:pluginId/dashboard/:tab"
                component={Overview}
              />
              <Route
                path="/full-page/:agentId/:buildVersion/:pluginId/scopes"
                component={ScopesList}
              />
              <Route
                path={[
                  '/full-page/:agentId/:buildVersion/:pluginId/scope/:scopeId/:tab',
                  '/full-page/:agentId/:buildVersion/:pluginId/scope/:scopeId/:tab/:modal',
                ]}
                component={ScopeInfo}
              />
              <Route
                path="/full-page/:agentId/:buildVersion/:pluginId/tests-to-run"
                component={TestsToRunList}
              />
            </Switch>
          </div>
          <CoveragePluginModals />
          <Route
            path={[
              '/full-page/:agentId/:buildVersion/:pluginId/dashboard/:tab/risks-modal',
              '/full-page/:agentId/:buildVersion/:pluginId/scopes/:scopeId/:tab/risks-modal',
            ]}
            component={RisksModal}
          />
          <Route
            path="/full-page/:agentId/:buildVersion/:pluginId/*/session-management-pane"
            component={SessionsManagementPaneProvider}
          />
        </>
      </InitialDataController>
    </CoveragePluginProvider>
  </div>
);
