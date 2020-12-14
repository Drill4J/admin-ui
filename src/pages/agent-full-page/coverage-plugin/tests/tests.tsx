import * as React from 'react';

import { TestCoverageInfo } from 'types/test-coverage-info';
import { useBuildVersion } from 'hooks';
import { TestDetails } from '../test-details';

export const Tests = () => {
  const tests = useBuildVersion<TestCoverageInfo[]>('/build/tests') || [];

  return (
    <TestDetails
      tests={tests}
      topicCoveredMethodsByTest="/build/tests/covered-methods"
    />
  );
};
