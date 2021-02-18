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
import { BEM, div } from '@redneckz/react-bem-helper';
import { useHistory } from 'react-router-dom';
import { Icons, Badge, Tooltip } from '@drill4j/ui-kit';

import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';
import { ServiceGroupAgents } from 'types/service-group-agents';

import styles from './name-column.module.scss';

interface Props {
  className?: string;
  agent?: Agent;
  withMargin?: boolean;
}

const nameColumn = BEM(styles);

export const NameColumn = nameColumn(
  ({
    className,
    agent: {
      id, name, buildVersion, agentType, status, agentVersion, ...agent
    } = {},
  }: Props) => {
    const { push } = useHistory();
    const { agents = [] } = agent as ServiceGroupAgents;
    const unregisteredAgentsCount = agents.reduce(
      (acc, item) => (item.status === AGENT_STATUS.NOT_REGISTERED ? acc + 1 : acc),
      0,
    );
    const isServiceGroup = agentType === 'ServiceGroup';
    const isOfflineAgent = agentType === 'Java' && !agentVersion;
    const AgentIcon = Icons[isOfflineAgent ? 'OfflineAgent' : 'Agent'];
    const agentIsDisabled = status === AGENT_STATUS.NOT_REGISTERED || isOfflineAgent
    || (unregisteredAgentsCount !== 0 && unregisteredAgentsCount === agents.length);

    return (
      <div className={className}>
        <div className="flex items-center w-full">
          <AgentTypeIcon disabled={agentIsDisabled}>
            {isServiceGroup
              ? <Icons.ServiceGroup />
              : (
                <Tooltip message={isOfflineAgent && 'Offline Agent'}>
                  <AgentIcon />
                </Tooltip>
              )}
          </AgentTypeIcon>
          {(status === AGENT_STATUS.NOT_REGISTERED) && <NewAgentBadge color="green">New</NewAgentBadge>}
          {unregisteredAgentsCount > 0 && (
            <NewAgentBadge color="green">{`+${unregisteredAgentsCount}`}</NewAgentBadge>
          )}
          <AgentName
            className="link"
            onClick={() => push(
              isServiceGroup
                ? `/service-group-full-page/${id}/service-group-dashboard`
                : `/full-page/${id}/${buildVersion}/dashboard`,
            )}
            disabled={agentIsDisabled}
            data-test="name-column"
          >
            {isServiceGroup ? `${name || id} (${agents.length})` : name || id}
          </AgentName>
        </div>
      </div>
    );
  },
);

const AgentTypeIcon = nameColumn.agentTypeIcon('div');
const NewAgentBadge = nameColumn.newAgentBadge(Badge);
const AgentName = nameColumn.agentName(
  div({ onClick: () => {}, 'data-test': '' } as {
    onClick: () => void;
    disabled: boolean;
    'data-test': string;
  }),
);
