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
import { Agent } from 'types/agent';
import { usePluginState } from '../store';
import { PluginCard } from './plugin-card';
import { CoverageSection, TestsSection, RisksSection, TestsToRunSection } from './sections';

interface Props {
  agent: Agent;
}

export const Dashboard = ({ agent }: Props) => {
  const { id: agentId, plugins = [] } = agent;
  const { buildVersion } = usePluginState();
  const installedPlugins = plugins.filter((plugin) => !plugin.available);

  return (
    <div tw="flex flex-col h-full w-full">
      <div tw="mt-5 mx-6 mb-7 text-24 leading-32 font-light">Dashboard</div>
      <div tw="flex flex-grow mx-6">
        {installedPlugins.length > 0 ? (
          <>
            {installedPlugins.map(({ id, name }) => (
              <PluginCard
                key={id}
                label={name}
                pluginLink={`/full-page/${agentId}/${buildVersion}/${id}/dashboard/methods`}
              >
                <CoverageSection />
                <TestsSection />
                <RisksSection />
                <TestsToRunSection />
              </PluginCard>
            ))}
          </>
        ) : (
          <NoPluginsStub agentId={agent.id} agentType="Agent" />
        )}
      </div>
    </div>
  );
};
