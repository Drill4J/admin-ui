import * as React from 'react';

import { AssociatedTests } from 'types/associated-tests';
import { useBuildVersion } from 'hooks';
import { TestDetails } from '../test-details';

export const Tests = () => {
  const testsUsages = useBuildVersion<AssociatedTests[]>('/build/tests-usages') || [];

  return (
    <TestDetails
      testsUsages={testsUsages}
      topicCoveredMethodsByTest="/build/tests/covered-methods"
    />
  );
};
