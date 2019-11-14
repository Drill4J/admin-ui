import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Icons } from '../../../../components';
import { AGENT_STATUS } from '../../../../common/constants';
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
      return (
        <div className={className}>
          {status === AGENT_STATUS.NOT_REGISTERED ? (
            <Icons.Register
              onClick={() => push(`/registration/${agentId}`)}
              data-test="action-column:icons-register"
            />
          ) : (
            <>
              <Icons.OpenLive
                onClick={() => push(`/full-page/${agentId}/${buildVersion}/dashboard`)}
                data-test="action-column:icons-open-live"
              />
              <Icons.Settings
                onClick={() => push(`/agents/${agentId}/settings`)}
                height={16}
                width={16}
                data-test="action-column:icons-settings"
              />
            </>
          )}
        </div>
      );
    },
  ),
);
