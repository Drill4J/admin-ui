import * as React from 'react';

import { AssociatedTests } from 'types/associated-tests';
import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { TestDetails } from '../test-details';
import { useBuildVersion } from '../use-build-version';

export const Tests = () => {
  const testsUsages = useBuildVersion<AssociatedTests[]>('/build/tests-usages') || [];
  const coveredMethodsByTest = useBuildVersion<MethodCoveredByTest[]>('/build/tests/covered-methods') || [];
  const coveredMethodsByTestType = useBuildVersion<MethodCoveredByTest[]>('/build/test-types/covered-methods') || [];
  return (
    <>
      <TestDetails
        testsUsages={testsUsages}
        coveredMethodsByTest={coveredMethodsByTest}
        coveredMethodsByTestType={coveredMethodsByTestType}
      />
    </>
  );
};
