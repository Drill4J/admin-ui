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
import { useHistory } from 'react-router-dom';
import { Icons, Badge, Tooltip } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';
import { ServiceGroupAgents } from 'types/service-group-agents';

interface Props {
  agent?: Agent;
  withMargin?: boolean;
}

const AgentName = styled.div`
  ${tw`text-ellipsis text-monochrome-default`}
  ${({ disabled }: { disabled: boolean }) => !disabled && tw`link`}
`;

const AgentTypeIcon = styled.div`
  ${tw`grid place-items-center w-6 h-6 text-monochrome-black`}
  ${({ disabled }: { disabled: boolean }) => disabled && tw`text-monochrome-default`}
`;
const Content = styled.div(({ withMargin }: { withMargin?: boolean }) => withMargin && tw`ml-9`);

export const NameColumn = ({
  withMargin,
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
    <Content tw="font-bold text-14 leading-48" withMargin={withMargin}>
      <div className="flex items-center gap-x-2 text-ellipsis">
        <AgentTypeIcon disabled={agentIsDisabled}>
          {isServiceGroup
            ? <Icons.ServiceGroup />
            : (
              <Tooltip message={isOfflineAgent && 'Offline Agent'}>
                <AgentIcon />
              </Tooltip>
            )}
        </AgentTypeIcon>
        {(status === AGENT_STATUS.NOT_REGISTERED) && <Badge tw="max-h-20px" color="green">New</Badge>}
        {unregisteredAgentsCount > 0 && (
          <Badge tw="max-h-20px" color="green">{`+${unregisteredAgentsCount}`}</Badge>
        )}
        <AgentName
          onClick={() => !agentIsDisabled && push(
            isServiceGroup
              ? `/service-group-full-page/${id}/service-group-dashboard`
              : `/full-page/${id}/${buildVersion}/dashboard`,
          )}
          disabled={agentIsDisabled}
          data-test="name-column"
          title={isServiceGroup ? `${name || id} (${agents.length})` : name || id}
        >
          {isServiceGroup ? `${name || id} (${agents.length})` : name || id}
        </AgentName>
      </div>
    </Content>
  );
};
