import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../layouts';
import { percentFormatter } from '../../../../../utils';
import { TestTypeSummary } from '../../../../../types/test-type-summary';

import styles from './coverages-by-type.module.scss';

interface Props {
  className?: string;
  coverageByType: { [testType: string]: TestTypeSummary };
}

const coveragesByType = BEM(styles);

export const CoveragesByType = coveragesByType(({ className, coverageByType }: Props) => {
  return (
    <div className={className}>
      {Object.values(coverageByType).map(({ testType, coverage }) => (
        <CoverageItem>
          <TestTypeIcon type={testType} />
          <TestTypeName>{testType}</TestTypeName>
          <TestTypeCoverage>{coverage ? `${percentFormatter(coverage)}%` : 'n/a'}</TestTypeCoverage>
        </CoverageItem>
      ))}
    </div>
  );
});

const CoverageItem = coveragesByType.coverageItem('div');
const TestTypeIcon = coveragesByType.testTypeIcon(div({} as { type: 'MANUAL' | 'AUTO' }));
const TestTypeName = coveragesByType.testTypeName(Panel);
const TestTypeCoverage = coveragesByType.testTypeCoverage('div');
