import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Icons } from '../../../../components';
import { AGENT_STATUS } from '../../../../common/constants';
import { RegisterAgentModal } from '../../register-agent-modal';
import { Agent } from '../../../../types/agent';

import styles from './actions-column.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  agent: Agent;
}

const actionsColumn = BEM(styles);

export const ActionsColumn = withRouter(
  actionsColumn(
    ({
      className,
      history: { push },
      agent: { id: agentId = '', status, buildVersion },
    }: Props) => {
      const [isModalOpen, setIsModalOpen] = React.useState(false);

      return (
        <div className={className}>
          {status === AGENT_STATUS.NOT_REGISTERED ? (
            <Icons.Register onClick={() => setIsModalOpen(true)} />
          ) : (
            <>
              <Icons.OpenLive
                onClick={() =>
                  push(`/full-page/${agentId}/${buildVersion}/test-to-code-mapping/dashboard`)
                }
              />
              <Icons.Settings
                onClick={() => push(`/agents/${agentId}/settings`)}
                height={16}
                width={16}
              />
            </>
          )}
          {isModalOpen && (
            <RegisterAgentModal isOpen={isModalOpen} onToggle={setIsModalOpen} agentId={agentId} />
          )}
        </div>
      );
    },
  ),
);
