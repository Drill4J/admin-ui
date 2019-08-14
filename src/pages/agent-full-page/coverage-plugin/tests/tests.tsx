import * as React from 'react';

import { TestDetails } from '../test-details';
import { useBuildVersion } from '../use-build-version';
import { AssociatedTests } from '../../../../types/associated-tests';

export const Tests = () => {
  const testsUsages = useBuildVersion<AssociatedTests[]>('/build/tests-usages') || [];
  return <TestDetails testsUsages={testsUsages} />;
};
