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

import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { Agent } from 'types/agent';
import { StateWatcherPluginHeader } from './state-watcher-plugin-header';
import { AgentStateWatcherLineChart } from './agent-state-watcher-line-chart';

export const StateWatcherPlugin = () => {
  const agentsList = useWsConnection<Agent[]>(
    defaultAdminSocket,
    '/api/agents',
  ) || [];

  return (
    <div tw="w-full h-full">
      <StateWatcherPluginHeader />
      {agentsList.map(({ id = '', buildVersion = '', instanceIds = [] }) => (
        <AgentStateWatcherLineChart
          id={id}
          buildVersion={buildVersion}
          instanceIds={instanceIds}
        />
      ))}
    </div>
  );
};
