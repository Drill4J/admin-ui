import * as React from 'react';

import { TestDetails } from '../test-details';
import { useBuildVersion } from '../use-build-version';
import { AssociatedTests } from '../../../../types/associated-tests';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
}

export const Tests = ({ agentId, buildVersion }: Props) => {
  const testsUsages =
    useBuildVersion<AssociatedTests[]>('/build/tests-usages', agentId, buildVersion) || [];
  return <TestDetails testsUsages={testsUsages} />;
};
