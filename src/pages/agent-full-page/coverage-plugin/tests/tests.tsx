import * as React from 'react';

import { AssociatedTests } from 'types/associated-tests';
import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { TestSummary } from 'types/test-summary';
import { TestTypeSummary } from 'types/test-type-summary';
import { TestTypeCount } from 'types/test-type-count';
import { TestDetails } from '../test-details';
import { useBuildVersion } from '../use-build-version';
import { ProjectTestsCards } from '../project-tests-cards';

export const Tests = () => {
  const testsUsages = useBuildVersion<AssociatedTests[]>('/build/tests-usages') || [];
  const coveredMethodsByTest = useBuildVersion<MethodCoveredByTest[]>('/build/tests/covered-methods') || [];
  const coveredMethodsByTestType = useBuildVersion<MethodCoveredByTest[]>('/build/test-types/covered-methods') || [];
  const allTests = useBuildVersion<TestSummary>('/build/summary/tests/all') || {};
  const testsByType = useBuildVersion<TestTypeSummary[]>('/build/summary/tests/by-type') || [];
  const testsToRun = useBuildVersion<TestTypeCount[]>('/build/summary/tests-to-run/by-type') || [];
  return (
    <>
      <ProjectTestsCards allTests={allTests} testsByType={testsByType} testsToRun={testsToRun} />
      <TestDetails
        testsUsages={testsUsages}
        coveredMethodsByTest={coveredMethodsByTest}
        coveredMethodsByTestType={coveredMethodsByTestType}
      />
    </>
  );
};
