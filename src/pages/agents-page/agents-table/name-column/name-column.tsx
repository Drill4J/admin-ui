import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { useHistory } from 'react-router-dom';
import { Panel, Icons, FilledBadge } from '@drill4j/ui-kit';

import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';
import { ServiceGroup } from 'types/service-group';

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
      id, name, buildVersion, agentType, status, ...agent
    } = {},
  }: Props) => {
    const { push } = useHistory();
    const { agents = [] } = agent as ServiceGroup;
    const unregisteredAgentsCount = agents.reduce(
      (acc, item) => (item.status === AGENT_STATUS.NOT_REGISTERED ? acc + 1 : acc),
      0,
    );
    const isServiceGroup = agentType === 'ServiceGroup';

    return (
      <div className={className}>
        <Panel>
          <AgentTypeIcon>
            {isServiceGroup ? <Icons.ServiceGroup /> : <Icons.Agent />}
          </AgentTypeIcon>
          {status === AGENT_STATUS.NOT_REGISTERED && <NewAgentBadge>New</NewAgentBadge>}
          {unregisteredAgentsCount > 0 && (
            <NewAgentBadge>{`+${unregisteredAgentsCount}`}</NewAgentBadge>
          )}
          <AgentName
            onClick={() => push(
              isServiceGroup
                ? `/service-group-full-page/${id}/service-group-dashboard`
                : `/full-page/${id}/${buildVersion}/dashboard`,
            )}
            disabled={
              status === AGENT_STATUS.NOT_REGISTERED
                || (unregisteredAgentsCount !== 0 && unregisteredAgentsCount === agents.length)
            }
            data-test="name-column"
          >
            {isServiceGroup ? `${name || id} (${agents.length})` : name || id}
          </AgentName>
        </Panel>
      </div>
    );
  },
);

const AgentTypeIcon = nameColumn.agentTypeIcon('div');
const NewAgentBadge = nameColumn.newAgentBadge(FilledBadge);
const AgentName = nameColumn.agentName(
  div({ onClick: () => {}, 'data-test': '' } as {
    onClick: () => void;
    disabled: boolean;
    'data-test': string;
  }),
);
