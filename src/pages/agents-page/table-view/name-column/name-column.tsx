import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from 'layouts';
import { Icons, FilledBadge } from 'components';
import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';

import styles from './name-column.module.scss';
import { ServiceGroup } from 'types/service-group';

interface Props extends RouteComponentProps {
  className?: string;
  agent?: Agent;
  unregistered?: boolean;
}

const nameColumn = BEM(styles);

export const NameColumn = withRouter(
  nameColumn(
    ({
      className,
      history: { push },
      agent: { id, name, buildVersion, agentType, status, ...agent } = {},
    }: Props) => {
      const { agents = [] } = agent as ServiceGroup;
      const unregisteredAgentsCount = agents.reduce(
        (acc, item) => (item.status === AGENT_STATUS.NOT_REGISTERED ? acc + 1 : acc),
        0,
      );
      return (
        <div className={className}>
          <Panel>
            <AgentTypeIcon>
              {agentType === 'ServiceGroup' ? <Icons.ServiceGroup /> : <Icons.Agent />}
            </AgentTypeIcon>
            {status === AGENT_STATUS.NOT_REGISTERED && <FilledBadge>New</FilledBadge>}
            {unregisteredAgentsCount > 0 && (
              <FilledBadge>{`+${unregisteredAgentsCount}`}</FilledBadge>
            )}
            <AgentName
              onClick={() =>
                agentType !== 'ServiceGroup' && push(`/full-page/${id}/${buildVersion}/dashboard`)
              }
              data-test="name-column"
            >
              {name || id}
            </AgentName>
          </Panel>
        </div>
      );
    },
  ),
);

const AgentTypeIcon = nameColumn.agentTypeIcon('div');
const AgentName = nameColumn.agentName('div');
