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
    testCount: 0,
  },
  AUTO: {
    testType: 'AUTO',
    coverage: 0,
    testCount: 0,
  },
  PERFORMANCE: {
    testType: 'PERFORMANCE',
    coverage: 0,
    testCount: 0,
  },
};

export const CoveragesByType = coveragesByType(({ className, coverageByType }: Props) => {
  return (
    <div className={className}>
      <CoverageTypesContainer>
        {Object.values({ ...coverageByTypeDefaults, ...coverageByType }).map(
          ({ testType, coverage = 0, testCount = 0 }) => (
            <CoverageItem key={testType}>
              <TestTypeIcon type={testType as any} />
              <TestTypeName>{testType.toLocaleLowerCase()}</TestTypeName>
              <TestsCount>({testCount})</TestsCount>
              <TestTypeCoverage>{`${percentFormatter(coverage)}%`}</TestTypeCoverage>
            </CoverageItem>
          ),
        )}
      </CoverageTypesContainer>
    </div>
  );
});

const CoverageTypesContainer = coveragesByType.coverageTypesContaier('div');
const CoverageItem = coveragesByType.coverageItem('div');
const TestTypeIcon = coveragesByType.testTypeIcon(div({} as { type: 'MANUAL' | 'AUTO' }));
const TestTypeName = coveragesByType.testTypeName('div');
const TestsCount = coveragesByType.testsCount(Panel);
const TestTypeCoverage = coveragesByType.testTypeCoverage('div');
