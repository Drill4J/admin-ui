import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { Section } from '../section';

import styles from './coverage-section.module.scss';

interface Props {
  className?: string;
  coverage?: number;
  arrow?: 'INCREASE' | 'DECREASE';
}

const coverageSection = BEM(styles);

export const CoverageSection = coverageSection(({ className, coverage = 0, arrow }: Props) => (
  <div className={className}>
    <Section
      label="Build Coverage"
      info={(
        <>
          {`${percentFormatter(coverage)}%`}
          {arrow && (
            <CoverageArrow
              rotate={arrow === 'INCREASE' ? 180 : 0}
              type={arrow}
              height={34}
              width={24}
            />
          )}
        </>
      )}
    />
  </div>
));

const CoverageArrow: React.FC<{
  rotate: number;
  type: 'INCREASE' | 'DECREASE';
  height: number;
  width: number;
}> = coverageSection.coverageArrow(Icons.CoverageArrow);
