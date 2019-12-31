import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Icons } from 'components';

import styles from './name-column.module.scss';
import { Panel } from 'layouts';

interface Props extends RouteComponentProps {
  className?: string;
  agentName: string;
  agentId: string;
  buildVersion: string;
  unregistered: boolean;
  agentType?: string;
}

const nameColumn = BEM(styles);

export const NameColumn = withRouter(
  nameColumn(
    ({ className, history: { push }, agentId, agentName, buildVersion, agentType }: Props) => (
      <div
        className={className}
        onClick={() => push(`/full-page/${agentId}/${buildVersion}/dashboard`)}
        data-test="name-column"
      >
        <Panel>
          <AgentTypeIcon>
            {agentType === 'ServiceGroup' ? <Icons.ServiceGroup /> : <Icons.Agent />}
          </AgentTypeIcon>
          {agentName || agentId}
        </Panel>
      </div>
    ),
  ),
);

const AgentTypeIcon = nameColumn.agentTypeIcon('div');
