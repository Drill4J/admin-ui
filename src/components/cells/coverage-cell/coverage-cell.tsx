import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ClickableCell } from '../clickable-cell';

import styles from './coverage-cell.module.scss';

interface Props {
  className?: string;
  value: number;
}

const coverageCell = BEM(styles);

export const CoverageCell = coverageCell(({ className, value = 0 }: Props) => (
  <div className={className}>
    <ClickableCell disabled>
      {value === 0 && (
        <CoverageIcon
          title="Test didn't cover any methods. Make sure the test is actual or modify/delete it."
        >
          <Icons.UncoveredMethods />
        </CoverageIcon>
      )}
      {percentFormatter(value)}
    </ClickableCell>
  </div>
));

const CoverageIcon = coverageCell.coverageIcon('span');
