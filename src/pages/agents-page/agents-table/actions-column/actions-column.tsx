import * as React from 'react';
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
  agent: | Agent;
}

const actionsColumn = BEM(styles);

export const ActionsColumn = actionsColumn(
  ({
    className,
    agent,
  }: Props) => {
    const {
      id: agentId = '', status, agentType = '',
    } = agent as Agent;
    const { push } = useHistory();
    const { name: serviceGroupName, agents = [] } = agent as ServiceGroup;
    const unregisteredAgentsCount = agents.reduce(
      (acc, { status: agentStatus }) => (agentStatus === AGENT_STATUS.NOT_REGISTERED ? acc + 1 : acc), 0,
    );
    return (
      <div className={className}>
        <Content align="end">
          {(status === AGENT_STATUS.NOT_REGISTERED || unregisteredAgentsCount > 0) && (
            <RegisterButton
              onClick={() => push(`/${
                agentType === 'ServiceGroup' ? 'bulk-registration' : 'registration'
              }/${agentId}?unregisteredAgentsCount=${unregisteredAgentsCount}&serviceGroupName=${serviceGroupName}`)}
              data-test="action-column:icons-register"
              type="primary"
            >
              <Panel>
                <Icons.Register />
                &nbsp;Register {unregisteredAgentsCount ? `(${unregisteredAgentsCount})` : ''}
              </Panel>
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
            disabled={status === AGENT_STATUS.NOT_REGISTERED}
          />
        </Content>
      </div>
    );
  },
);

const Content = actionsColumn.content(Panel);
const RegisterButton = actionsColumn.registerButton(Button);
const SettingsButton: React.FC<ComponentPropsType<typeof Icons.Settings> & { disabled?: boolean}> =
  actionsColumn.settingsButton(Icons.Settings);
