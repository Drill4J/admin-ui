import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import styles from './dashboard-header-cell.module.scss';

interface Props {
  className?: string;
  label?: string;
  value?: string | number;
}

const dashboardHeaderCell = BEM(styles);

export const DashboardHeaderCell = dashboardHeaderCell(({ className, label, value }: Props) => (
  <div className={className}>
    <Content>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Content>
  </div>
));

const Content = dashboardHeaderCell.content('div');
const Label = dashboardHeaderCell.label('span');
const Value = dashboardHeaderCell.value(
  span({ onClick: () => {} } as { onClick?: () => void; clickable?: boolean }),
);
