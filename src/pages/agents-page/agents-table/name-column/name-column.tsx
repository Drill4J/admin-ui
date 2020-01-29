import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from 'layouts';
import { Icons, FilledBadge } from 'components';
import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';
import { ServiceGroup } from 'types/service-group';

import styles from './name-column.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  agent?: Agent;
  withMargin?: boolean;
}

const nameColumn = BEM(styles);

export const NameColumn = withRouter(
  nameColumn(
    ({
      className,
      history: { push },
      agent: {
        id, name, buildVersion, agentType, status, ...agent
      } = {},
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
            {status === AGENT_STATUS.NOT_REGISTERED && <NewAgentBadge>New</NewAgentBadge>}
            {unregisteredAgentsCount > 0 && (
              <NewAgentBadge>{`+${unregisteredAgentsCount}`}</NewAgentBadge>
            )}
            <AgentName
              onClick={() => push(
                agentType === 'ServiceGroup'
                  ? `/service-group-full-page/${id}/service-group-dashboard`
                  : `/full-page/${id}/${buildVersion}/dashboard`,
              )}
              disabled={
                status === AGENT_STATUS.NOT_REGISTERED
                || (unregisteredAgentsCount !== 0 && unregisteredAgentsCount === agents.length)
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
const NewAgentBadge = nameColumn.newAgentBadge(FilledBadge);
const AgentName = nameColumn.agentName(
  div({ onClick: () => {}, 'data-test': '' } as {
    onClick: () => void;
    disabled: boolean;
    'data-test': string;
  }),
);
