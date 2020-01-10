import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Icons } from 'components';
import { Button } from 'forms';
import { AGENT_STATUS } from 'common/constants';
import { Agent } from 'types/agent';

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
      agent: { id: agentId = '', status, agentType = '' },
    }: Props) => {
      return (
        <div className={className}>
          <Content>
            {status === AGENT_STATUS.NOT_REGISTERED ? (
              <RegisterButton
                onClick={() => push(`/registration/${agentId}`)}
                data-test="action-column:icons-register"
                type="primary"
              >
                <Icons.Register />
                Register
              </RegisterButton>
            ) : (
              <Icons.Settings
                onClick={() =>
                  push(
                    `/agents/${
                      agentType === 'ServiceGroup' ? 'service-group' : 'agent'
                    }/${agentId}/settings/`,
                  )
                }
                height={16}
                width={16}
                data-test="action-column:icons-settings"
              />
            )}
          </Content>
        </div>
      );
    },
  ),
);

const Content = actionsColumn.content('div');
const RegisterButton = actionsColumn.registerButton(Button);
