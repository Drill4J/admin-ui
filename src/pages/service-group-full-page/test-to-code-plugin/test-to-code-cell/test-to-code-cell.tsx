import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import { Tooltip } from 'components';
import styles from './test-to-code-cell.module.scss';

interface Props {
  className?: string;
  value: number;
  onClick?: () => void;
  testContext?: string;
}

const testToCodeCell = BEM(styles);

export const TestToCodeCell = testToCodeCell(({
  className, value, onClick, testContext,
}: Props) => (
  <div className={className}>
    <Content>
      <Value onClick={onClick} clickable={Boolean(onClick && value)} data-test={`dashboard-cell:value:${testContext}`}>
        {value === undefined ? <Tooltip message="Test2Code plugin is not installed">n/a</Tooltip> : value}
      </Value>
    </Content>
  </div>
));

const Content = testToCodeCell.content('div');
const Value = testToCodeCell.value(
  span({ onClick: () => {}, 'data-test': '' } as { onClick?: () => void; clickable?: boolean; 'data-test'?: string }),
);
