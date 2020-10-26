import * as React from 'react';

import { AssociatedTests } from 'types/associated-tests';
import { TestSummary } from 'types/test-summary';
import { TestTypeSummary } from 'types/test-type-summary';
import { useBuildVersion } from 'hooks';
import { TestDetails } from '../test-details';
import { ProjectTestsCards } from '../project-tests-cards';

export const Tests = () => {
  const testsUsages = useBuildVersion<AssociatedTests[]>('/build/tests-usages') || [];
  const allTests = useBuildVersion<TestSummary>('/build/summary/tests/all') || {};
  const testsByType = useBuildVersion<TestTypeSummary[]>('/build/summary/tests/by-type') || [];
  return (
    <>
      <ProjectTestsCards allTests={allTests} testsByType={testsByType} />
      <TestDetails
        testsUsages={testsUsages}
        topicCoveredMethodsByTest="/build/tests/covered-methods"
      />
    </>
  );
};
