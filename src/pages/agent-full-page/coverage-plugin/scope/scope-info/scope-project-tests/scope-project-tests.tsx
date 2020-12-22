import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { BuildTestsCard } from 'components';
import { TestsInfo } from 'types/tests-info';
import { BuildCoverage } from 'types/build-coverage';
import { useBuildVersion } from 'hooks';
import { ActiveBuildTestsInfo } from '../../../active-build-tests-info';

import styles from './scope-project-tests.module.scss';

interface Props {
  className?: string;
  scopeId: string;
}

const scopeProjectTests = BEM(styles);

export const ScopeProjectTests = scopeProjectTests(({ className, scopeId }: Props) => {
  const { byTestType = [] } = useBuildVersion<BuildCoverage>(`/scope/${scopeId}/coverage`) || {};
  const testsInfo: TestsInfo = byTestType.reduce((test, testType) => ({ ...test, [testType.type]: testType }), {});

  return (
    <div className={className}>
      <ActiveBuildTestsInfo testsInfo={testsInfo} />
      <Cards>
        <BuildTestsCard label="AUTO" testTypeSummary={testsInfo.AUTO} />
        <BuildTestsCard label="MANUAL" testTypeSummary={testsInfo.MANUAL} />
      </Cards>
    </div>
  );
});

const Cards = scopeProjectTests.cards('div');
