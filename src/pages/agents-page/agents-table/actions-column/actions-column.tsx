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
import { Link } from 'react-router-dom';
import { Icons, Button, Tooltip } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { AGENT_STATUS } from 'common/constants';
import { ServiceGroupEntity } from 'types/service-group-entity';
import { Agent } from 'types/agent';

interface ServiceGroup extends ServiceGroupEntity {
  name: string;
  agents: Agent[];
}

interface Props {
  agent: Agent;
}

export const ActionsColumn = ({ agent }: Props) => {
  const {
    id: agentId = '', status, agentType = '', group = '',
  } = agent;
  const { agents = [] } = agent as ServiceGroup;
  const unregisteredAgentsCount = agents.reduce(
    (acc, { status: agentStatus }) => (agentStatus === AGENT_STATUS.NOT_REGISTERED ? acc + 1 : acc), 0,
  );
  const hasOfflineAgent = agents.some(({ status: agentStatus }) => agentStatus === AGENT_STATUS.OFFLINE);
  const isJavaAgentsServiceGroup = agents.every((serviceGroupAgent) => serviceGroupAgent.agentType === 'Java');
  const disableRegisterButton = agentType === 'ServiceGroup' && !isJavaAgentsServiceGroup;

  return (
    <div className="flex items-center">
      {(status === AGENT_STATUS.NOT_REGISTERED || unregisteredAgentsCount > 0) && (
        <Tooltip
          tw="mr-8"
          position="top-left"
          message={agentType === 'ServiceGroup' && !isJavaAgentsServiceGroup && (
            <div className="text-center">
              Bulk registration is disabled for multi-type agents.
              <br />
              Please register your agents separately.
            </div>
          )}
        >
          <RegisterLink
            disabled={disableRegisterButton}
            to={`/${
              agentType === 'ServiceGroup' ? 'bulk-registration' : 'registration'
            }/${agentId}?unregisteredAgentsCount=${unregisteredAgentsCount}`}
          >
            <Button
              data-test="action-column:icons-register"
              size="small"
              type={agentType === 'ServiceGroup' || !group ? 'primary' : 'secondary'}
              disabled={disableRegisterButton}
              tw="flex items-center w-full gap-x-2"
            >
              <Icons.Register />
              Register {unregisteredAgentsCount ? `(${unregisteredAgentsCount})` : ''}
            </Button>
          </RegisterLink>
        </Tooltip>
      )}
      {((status === AGENT_STATUS.ONLINE && agentType !== 'ServiceGroup') ||
        (!hasOfflineAgent && !unregisteredAgentsCount && agentType === 'ServiceGroup')) && (
        <Link
          to={`/agents/${
            agentType === 'ServiceGroup' ? 'service-group' : 'agent'
          }/${agentId}/settings/general`}
          tw="link"
        >
          <Icons.Settings
            height={16}
            width={16}
            data-test="action-column:icons-settings"
          />
        </Link>
      )}
    </div>
  );
};

const RegisterLink = styled(Link)<{disabled: boolean}>`
  ${({ disabled }) => disabled && tw`cursor-default pointer-events-none`}
`;
