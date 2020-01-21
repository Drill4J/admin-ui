import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import styles from './dashboard-cell.module.scss';

interface Props {
  className?: string;
  label?: string;
  value: number;
  onClick?: () => void;
}

const dashboardCell = BEM(styles);

export const DashboardCell = dashboardCell(({
  className, label, value, onClick,
}: Props) => (
  <div className={className}>
    <Content>
      <Label>{label}</Label>
      <Value onClick={onClick} clickable={Boolean(value && onClick)}>
        {value}
      </Value>
    </Content>
  </div>
));

const Content = dashboardCell.content('div');
const Label = dashboardCell.label('div');
const Value = dashboardCell.value(
  span({ onClick: () => {} } as { onClick?: () => void; clickable?: boolean }),
);
