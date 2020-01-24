import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { spacesToDashes } from 'utils';

import styles from './dashboard-header-cell.module.scss';

interface Props {
  className?: string;
  label: string;
  value?: string | number;
  onClick?: () => void;
}

const dashboardHeaderCell = BEM(styles);

export const DashboardHeaderCell = dashboardHeaderCell(({
  className, label, value, onClick,
}: Props) => (
  <div className={className}>
    <Content>
      <Label>{label}</Label>
      <Value
        onClick={onClick}
        clickable={Boolean(value && onClick)}
        data-test={`dashboard-header-cell:${spacesToDashes(label)}:value`}
      >
        {value}
      </Value>
    </Content>
  </div>
));

const Content = dashboardHeaderCell.content('div');
const Label = dashboardHeaderCell.label('div');
const Value = dashboardHeaderCell.value(
  div({ onClick: () => {}, 'data-test': '' } as { onClick?: () => void; clickable?: boolean;'data-test'?: string }),
);
