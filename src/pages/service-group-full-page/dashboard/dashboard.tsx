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
import 'twin.macro';

import { NoPluginsStub } from 'modules';
import { Plugin } from 'types/plugin';
import { ServiceGroupSummary } from 'types/service-group-summary';
import { usePluginData } from '../use-plugin-data';
import { PluginCard } from './plugin-card';
import { CoverageSection, RisksSection, TestsToRunSection, TestsSection } from './sections';

interface Props {
  serviceGroupId: string;
  plugins: Plugin[];
}

export const Dashboard = ({ serviceGroupId, plugins }: Props) => (
  <div tw="flex flex-col w-full h-full">
    <div tw="my-6 font-light text-24 leading-32">Dashboard</div>
    <div tw="flex flex-grow">
      {plugins.length > 0 ? (
        plugins.map(({ id: pluginId = '', name }) => {
          const {
            aggregated: {
              scopeCount = 0,
              coverage = 0,
              methodCount = {},
              tests = [],
              testsToRun = {},
              riskCounts = {},
            } = {},
          } = usePluginData<ServiceGroupSummary>('/group/summary', serviceGroupId, pluginId) || {};

          return (
            <PluginCard
              label={name}
              pluginLink={`/service-group-full-page/${serviceGroupId}/${pluginId}`}
              key={pluginId}
            >
              <CoverageSection totalCoverage={coverage} methodCount={methodCount} />
              <TestsSection testsType={tests} scopeCount={scopeCount} />
              <RisksSection risks={riskCounts} />
              <TestsToRunSection testsToRun={testsToRun} />
            </PluginCard>
          );
        })
      ) : (
        <NoPluginsStub agentId={serviceGroupId} agentType="ServiceGroup" />
      )}
    </div>
  </div>
);
