import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Icons, Tooltip } from 'components';
import { percentFormatter } from 'utils';

import styles from './test-to-code-coverage-cell.module.scss';

interface Props {
  className?: string;
  value?: number;
  arrow: string;
}

const testToCodeCoverageCell = BEM(styles);

export const TestToCodeCoverageCell = testToCodeCoverageCell(({ className, value, arrow }: Props) => (
  <div className={className}>
    <Content>
      <Value data-test="dashboard-coverage-cell:value">
        {arrow && (
          <ArrowIcon
            rotate={arrow === 'INCREASE' ? 180 : 0}
            type={arrow}
            width={12}
            heigth={14}
            data-test="dashboard-coverage-cell:arrow-icon"
          />
        )}
        {value === undefined ? <Tooltip message="Test2Code plugin is not installed">n/a</Tooltip> : `${percentFormatter(value)}%`}
      </Value>
    </Content>
  </div>
));

const Content = testToCodeCoverageCell.content('div');
const Value = testToCodeCoverageCell.value(Panel);
const ArrowIcon: React.FC<{
  rotate: number;
  type: string;
  width: number;
  heigth: number;
}> = testToCodeCoverageCell.arrowIcon(Icons.CoverageArrow);
