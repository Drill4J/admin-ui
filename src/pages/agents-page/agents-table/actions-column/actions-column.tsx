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
import { useHistory } from 'react-router-dom';
import { Panel, Icons, Button } from '@drill4j/ui-kit';

import { AGENT_STATUS } from 'common/constants';
import { CommonEntity } from 'types/common-entity';
import { Agent } from 'types/agent';
import { ComponentPropsType } from 'types/component-props-type';

import styles from './actions-column.module.scss';

interface ServiceGroup extends CommonEntity {
  name: string;
  agents: Agent[];
}

interface Props {
  className?: string;
  agent: Agent;
}

const actionsColumn = BEM(styles);

export const ActionsColumn = actionsColumn(({ className, agent }: Props) => {
  const {
    id: agentId = '', status, agentType = '',
  } = agent;
  const { push } = useHistory();
  const { agents = [] } = agent as ServiceGroup;
  const unregisteredAgentsCount = agents.reduce(
    (acc, { status: agentStatus }) => (agentStatus === AGENT_STATUS.NOT_REGISTERED ? acc + 1 : acc), 0,
  );
  const hasOfflineAgent = agents.some(({ status: agentStatus }) => agentStatus === AGENT_STATUS.OFFLINE);

  return (
    <div className={className}>
      <Content align="end">
        {(status === AGENT_STATUS.NOT_REGISTERED || unregisteredAgentsCount > 0) && (
          <RegisterButton
            onClick={() => push(`/${
              agentType === 'ServiceGroup' ? 'bulk-registration' : 'registration'
            }/${agentId}?unregisteredAgentsCount=${unregisteredAgentsCount}`)}
            data-test="action-column:icons-register"
            type="primary"
          >
            <div className="d-flex align-items-center w-100">
              <RegisterIcon />
              Register {unregisteredAgentsCount ? `(${unregisteredAgentsCount})` : ''}
            </div>
          </RegisterButton>
        )}
        <SettingsButton
          onClick={() => push(
            `/agents/${
              agentType === 'ServiceGroup' ? 'service-group' : 'agent'
            }/${agentId}/settings/`,
          )}
          height={16}
          width={16}
          data-test="action-column:icons-settings"
          disabled={(status && status !== AGENT_STATUS.ONLINE) || hasOfflineAgent || unregisteredAgentsCount > 0}
        />
      </Content>
    </div>
  );
});

const Content = actionsColumn.content(Panel);
const RegisterButton = actionsColumn.registerButton(Button);
const SettingsButton: React.FC<ComponentPropsType<typeof Icons.Settings> & { disabled?: boolean}> =
  actionsColumn.settingsButton(Icons.Settings);
const RegisterIcon = actionsColumn.registerIcon(Icons.Register);
