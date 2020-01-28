import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import styles from './dashboard-cell.module.scss';

interface Props {
  className?: string;
  value: number;
  onClick?: () => void;
}

const dashboardCell = BEM(styles);

export const DashboardCell = dashboardCell(({
  className, value, onClick,
}: Props) => (
  <div className={className}>
    <Content>
      <Value onClick={onClick} clickable={Boolean(onClick && value)} data-test="dashboard-cell:value">
        {value}
      </Value>
    </Content>
  </div>
));

const Content = dashboardCell.content('div');
const Value = dashboardCell.value(
  span({ onClick: () => {}, 'data-test': '' } as { onClick?: () => void; clickable?: boolean; 'data-test'?: string }),
);
