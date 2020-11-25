import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';

import styles from './coverage-cell.module.scss';

interface Props {
  className?: string;
  value: number;
}

const coverageCell = BEM(styles);

export const CoverageCell = coverageCell(({ className, value }: Props) => (
  <div className={className}>
    {`${percentFormatter(value)}%`}
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
