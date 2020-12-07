import * as React from 'react';
import { Panel, Spinner, Inputs } from '@drill4j/ui-kit';
import axios from 'axios';

import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';
import { AgentStatus } from 'types/agent-status';
import { NotificationManagerContext } from 'notification-manager';

interface Props {
  className?: string;
  agent: Agent;
}

export const AgentStatusToggle = ({ className, agent }: Props) => {
  const { showMessage } = React.useContext(NotificationManagerContext);
  return (
    <div className={className}>
      <Panel data-test="agent-status-toggle">
        <Inputs.Toggler
          value={agent.status === AGENT_STATUS.ONLINE || agent.status === AGENT_STATUS.BUSY}
          label={toggleLabel(agent.status)}
          onChange={async () => {
            try {
              await axios.post(`/agents/${agent.id}/toggle`);
              showMessage({ type: 'SUCCESS', text: `Agent has been ${agent.status === AGENT_STATUS.ONLINE ? 'disabled' : 'enabled'}.` });
            } catch ({ response: { data: { message = '' } = {} } = {} }) {
              showMessage({ type: 'ERROR', text: message || 'There is some issue with your action. Please try again later.' });
            }
          }}
          disabled={agent.status === AGENT_STATUS.NOT_REGISTERED || agent.status === AGENT_STATUS.BUSY || !agent.instanceIds?.length}
        />
      </Panel>
    </div>
  );
};

function toggleLabel(status: AgentStatus | undefined) {
  switch (status) {
    case AGENT_STATUS.ONLINE:
      return 'On';

    case AGENT_STATUS.BUSY:
      return <Spinner />;

    default:
      return 'Off';
  }
}
