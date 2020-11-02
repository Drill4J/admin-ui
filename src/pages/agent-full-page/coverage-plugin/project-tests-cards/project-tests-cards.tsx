import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { InfoCard } from 'components';
import { percentFormatter } from 'utils';
import { TestTypeSummary } from 'types/test-type-summary';
import { TestSummary } from 'types/test-summary';
import { TestsInfo } from 'types/tests-info';

import styles from './project-tests-cards.module.scss';

interface Props {
  className?: string;
  allTests: TestSummary;
  testsByType: TestTypeSummary[];
}

const projectTestsCards = BEM(styles);

export const ProjectTestsCards = projectTestsCards(
  ({
    className, allTests, testsByType,
  }: Props) => {
    const testsInfo: TestsInfo = testsByType.reduce((test, testType) => ({ ...test, [testType.type]: testType }), {});
    return (
      <div className={className}>
        <InfoCard
          label="TOTAL"
          covered={`${percentFormatter(allTests.coverage?.percentage || 0)}%`}
          totalCount={allTests.testCount}
        />
        <InfoCard
          label="AUTOMATED"
          covered={`${percentFormatter(testsInfo?.AUTO?.summary?.coverage?.percentage || 0)}%`}
          totalCount={testsInfo?.AUTO?.summary?.testCount}
        />
        <InfoCard
          label="MANUAL"
          covered={`${percentFormatter(testsInfo?.MANUAL?.summary?.coverage?.percentage || 0)}%`}
          totalCount={testsInfo?.MANUAL?.summary?.testCount}
        />
      </div>
    );
  },
);
