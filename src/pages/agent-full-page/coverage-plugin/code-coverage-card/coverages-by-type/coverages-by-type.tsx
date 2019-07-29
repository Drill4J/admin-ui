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

const coverageByTypeDefaults = {
  MANUAL: {
    testType: 'MANUAL',
    coverage: 0,
  },
  AUTO: {
    testType: 'AUTO',
    coverage: 0,
  },
  PERFORMANCE: {
    testType: 'PERFORMANCE',
    coverage: 0,
  },
};

export const CoveragesByType = coveragesByType(({ className, coverageByType }: Props) => {
  return (
    <div className={className}>
      {Object.values({ ...coverageByTypeDefaults, ...coverageByType }).map(
        ({ testType, coverage = 0 }) => (
          <CoverageItem key={testType}>
            <TestTypeIcon type={testType as any} />
            <TestTypeName>{testType}</TestTypeName>
            <TestTypeCoverage>{`${percentFormatter(coverage)}%`}</TestTypeCoverage>
          </CoverageItem>
        ),
      )}
    </div>
  );
});

const CoverageItem = coveragesByType.coverageItem('div');
const TestTypeIcon = coveragesByType.testTypeIcon(div({} as { type: 'MANUAL' | 'AUTO' }));
const TestTypeName = coveragesByType.testTypeName(Panel);
const TestTypeCoverage = coveragesByType.testTypeCoverage('div');
