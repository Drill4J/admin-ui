import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../../layouts';
import { percentFormatter } from '../../../../../../utils';

import styles from './coverage-by-type.module.scss';

interface Props {
  className?: string;
  testType: string;
  coverage: number;
  testCount: number;
}

const coverageByType = BEM(styles);

export const CoverageByType = coverageByType(
  ({ className, testType, coverage, testCount }: Props) => (
    <div className={className}>
      <Panel>
        <TestTypeIcon type={testType} />
        <TestName>{testType}</TestName>
      </Panel>
      <Coverage>{percentFormatter(coverage)}%</Coverage>
      <TestsCount>{testCount} tests</TestsCount>
    </div>
  ),
);

const TestTypeIcon = coverageByType.testTypeIcon(div({} as { type: string }));
const TestName = coverageByType.testName('div');
const Coverage = coverageByType.coverage('div');
const TestsCount = coverageByType.testsCount('div');
