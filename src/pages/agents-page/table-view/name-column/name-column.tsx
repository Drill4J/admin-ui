import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import styles from './name-column.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  agentName: string;
  agentId: string;
}

const nameColumn = BEM(styles);

export const NameColumn = withRouter(
  nameColumn(({ className, history: { push }, agentId, agentName }: Props) => (
    <div className={className} onClick={() => push(`/agents/${agentId}`)}>
      {agentName}
    </div>
  )),
);
