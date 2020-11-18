import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { BuildTestsCard } from 'components';
import { TestTypeSummary } from 'types/test-type-summary';
import { TestsInfo } from 'types/tests-info';

import styles from './project-tests-cards.module.scss';

interface Props {
  className?: string;
  testsByType?: TestTypeSummary[];
}

const projectTestsCards = BEM(styles);

export const ProjectTestsCards = projectTestsCards(
  ({
    className, testsByType = [],
  }: Props) => {
    const testsInfo: TestsInfo = testsByType.reduce((test, testType) => ({ ...test, [testType.type]: testType }), {});

    return (
      <div className={className}>
        <BuildTestsCard
          percentage={testsInfo?.AUTO?.summary?.coverage?.percentage}
          label="AUTO"
          totalCount={testsInfo?.AUTO?.summary?.testCount}
        />
        <BuildTestsCard
          percentage={testsInfo?.MANUAL?.summary?.coverage?.percentage}
          label="MANUAL"
          totalCount={testsInfo?.MANUAL?.summary?.testCount}
        />
      </div>
    );
  },
);
