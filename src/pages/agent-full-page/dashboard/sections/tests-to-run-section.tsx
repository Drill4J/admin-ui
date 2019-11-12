import * as React from 'react';

import { useBuildVersion } from '../../coverage-plugin/use-build-version';
import { SingleBar } from '../single-bar';
import { Section } from './section';
import { TestsToRun } from '../../../../types/tests-to-run';

export const TestsToRunSection = () => {
  const { testsToRun = {} } = useBuildVersion<TestsToRun>(`/build/tests-to-run`) || {};
  const totalCoveredMethodCount = Object.values(testsToRun).reduce(
    (acc, tests) => acc + tests.length,
    0,
  );

  return (
    <Section
      label="Tests to run"
      info={totalCoveredMethodCount}
      graph={
        <>
          <SingleBar
            width={64}
            height={128}
            color="#9600FF"
            percent={(testsToRun.AUTO && testsToRun.AUTO.length / totalCoveredMethodCount) * 100}
            icon="Auto"
          />
          <SingleBar
            width={64}
            height={128}
            color="#E78E00"
            percent={
              (testsToRun.MANUAL && testsToRun.MANUAL.length / totalCoveredMethodCount) * 100
            }
            icon="Manual"
          />
        </>
      }
    />
  );
};
