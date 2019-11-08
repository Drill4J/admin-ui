import * as React from 'react';

import { Panel } from '../../../layouts';
import { Spinner } from '../../../components';
import { Inputs } from '../../../forms';
import { AGENT_STATUS } from '../../../common/constants';
import { AgentStatus } from '../../../types/AgentStatus';

interface Props {
  className?: string;
  status: AgentStatus | undefined;
  onChange: () => void;
}

export const AgentStatusToggler = ({ className, status, onChange }: Props) => (
  <div className={className}>
    <Panel>
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
