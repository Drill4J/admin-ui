import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, Icons, Tooltip } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ArrowType } from 'types/arrow-type';

import styles from './test-to-code-coverage-cell.module.scss';

interface Props {
  className?: string;
  value?: number;
  arrow: ArrowType;
}

const testToCodeCoverageCell = BEM(styles);

export const TestToCodeCoverageCell = testToCodeCoverageCell(({ className, value = 0, arrow }: Props) => (
  <div className={className}>
    <Content>
      <Value data-test="dashboard-coverage-cell:value">
        {value === undefined ? (
          <Tooltip message={(
            <Panel direction="column">
              <div>Test2Code plugin</div>
              <div>is not installed</div>
            </Panel>
          )}
          >
            n/a
          </Tooltip>
        ) : `${percentFormatter(value)}%`}
        {(arrow === 'INCREASE' || arrow === 'DECREASE') && (
          <ArrowIcon
            rotate={arrow === 'INCREASE' ? 180 : 0}
            type={arrow}
            width={12}
            heigth={14}
            data-test="dashboard-coverage-cell:arrow-icon"
          />
        )}
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
