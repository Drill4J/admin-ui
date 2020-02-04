import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

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
        {value}
      </Value>
    </Content>
  </div>
));

const Content = testToCodeCell.content('div');
const Value = testToCodeCell.value(
  span({ onClick: () => {}, 'data-test': '' } as { onClick?: () => void; clickable?: boolean; 'data-test'?: string }),
);
