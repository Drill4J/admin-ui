import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Icons } from 'components';
import { percentFormatter } from 'utils';

import styles from './dashboard-coverage-cell.module.scss';

interface Props {
  className?: string;
  value: number;
  arrow: string;
}

const dashboardCoverageCell = BEM(styles);

export const DashboardCoverageCell = dashboardCoverageCell(({ className, value, arrow }: Props) => {
  return (
    <div className={className}>
      <Content>
        <Value>
          {arrow && (
            <ArrowIcon
              rotate={arrow === 'INCREASE' ? 180 : 0}
              type={arrow}
              width={12}
              heigth={14}
            />
          )}
          {percentFormatter(value)}%
        </Value>
      </Content>
    </div>
  );
});

const Content = dashboardCoverageCell.content('div');
const Value = dashboardCoverageCell.value(Panel);
const ArrowIcon: React.FC<{
  rotate: number;
  type: string;
  width: number;
  heigth: number;
}> = dashboardCoverageCell.arrowIcon(Icons.CoverageArrow);
