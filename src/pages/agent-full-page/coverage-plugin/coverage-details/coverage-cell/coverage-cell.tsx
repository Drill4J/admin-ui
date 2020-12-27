import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { CellProps } from '../table/table-types';

import styles from './coverage-cell.module.scss';

const coverageCell = BEM(styles);

interface Props extends CellProps<number, unknown>{
  className?: string;
}

export const CoverageCell = coverageCell(({ className, value = 0 }: Props) => (
  <div className={className}>
    <span data-test="coverage-cell:coverage">{`${percentFormatter(value)}%`}</span>
    {getCoverageIcon(value)}
  </div>
));

const IconWrapper = coverageCell.icon(
  div({ type: undefined } as { type?: 'success' | 'error' | 'warning' }),
);

function getCoverageIcon(coverage: number) {
  if (!coverage) {
    return (
      <IconWrapper type="error">
        <Icons.Cancel height={16} width={16} />
      </IconWrapper>
    );
  }
  if (coverage === 100) {
    return (
      <IconWrapper type="success">
        <Icons.Checkbox height={16} width={16} />
      </IconWrapper>
    );
  }

  return (
    <IconWrapper type="warning">
      <Icons.Warning height={16} width={16} />
    </IconWrapper>
  );
}
