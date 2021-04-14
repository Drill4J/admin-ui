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
import { Button, Icons } from '@drill4j/ui-kit';
import { Link } from 'react-router-dom';
import 'twin.macro';

import { PageHeader, Stub } from 'components';
import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { Agent } from 'types/agent';
import { ServiceGroup } from 'types/service-group';
import { AgentsTable } from './agents-table';
import { ReactComponent as NoAgentsSvg } from './no-agents.svg';

export const AgentsPage = () => {
  const agentsList = useWsConnection<Agent[]>(
    defaultAdminSocket,
    '/api/agents',
  ) || [];
  const serviceGroups = useWsConnection<ServiceGroup[]>(defaultAdminSocket, '/api/groups') || [];
  const agents = [
    ...serviceGroups.map((serviceGroup) => ({
      ...serviceGroup,
      agentType: 'ServiceGroup',
      agents: agentsList.filter((agent) => agent.group === serviceGroup.id),
    })),
    ...agentsList.filter(({ group }) => !group),
  ];

  return (
    <div tw="flex flex-col flex-grow">
      <PageHeader
        title="Agents"
        itemsCount={agentsList.length}
        actions={(
          <Link to="/preregister/offline-agent">
            <Button
              className="flex gap-x-2"
              type="secondary"
              size="large"
            >
              <Icons.Register />
              <span>Preregister Offline Agent</span>
            </Button>
          </Link>
        )}
      />
      <div tw="flex flex-row flex-grow flex-wrap m-6">{agentsList.length > 0 ? <AgentsTable agents={agents} /> : (
        <Stub
          icon={<NoAgentsSvg />}
          title="No agents online at the moment"
          message={(
            <>
              Run your application with Drill4J Agent using&nbsp;
              <a
                tw="text-blue-default"
                href="https://drill4j.github.io/how-to-start/"
                rel="noopener noreferrer"
                target="_blank"
              >
                this guide.
              </a>
            </>
          )}
        />
      )}
      </div>
    </div>
  );
};
