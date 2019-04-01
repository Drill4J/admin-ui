import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Icons } from '../../../../components';

import styles from './actions-column.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  agentId: string;
}

const actionsColumn = BEM(styles);

export const ActionsColumn = withRouter(
  actionsColumn(({ className, history: { push }, agentId }: Props) => (
    <div className={className}>
      <Icons.NewWindow onClick={() => push(`/full-page/${agentId}/coverage`)} />
      <Icons.Settings height={16} width={16} />
    </div>
  )),
);
