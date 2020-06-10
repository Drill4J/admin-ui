import * as React from 'react';
import { Panel, Spinner, Inputs } from '@drill4j/ui-kit';

import { AGENT_STATUS } from 'common/constants';
import { AgentStatus } from 'types/agent-status';

interface Props {
  className?: string;
  status: AgentStatus | undefined;
  onChange: () => void;
}

export const AgentStatusToggler = ({ className, status, onChange }: Props) => (
  <div className={className}>
    <Panel data-test="agent-status-toggler">
      {status === AGENT_STATUS.BUSY ? (
        <Inputs.Toggler value={status === AGENT_STATUS.BUSY} label={<Spinner />} disabled />
      ) : (
        <Inputs.Toggler
          value={status === AGENT_STATUS.ONLINE}
          label={status === AGENT_STATUS.ONLINE ? 'On' : 'Off'}
          onChange={onChange}
          disabled={status === AGENT_STATUS.NOT_REGISTERED}
        />
      )}
    </Panel>
  </div>
);
