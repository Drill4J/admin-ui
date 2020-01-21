import * as React from 'react';

import { Panel } from 'layouts';
import { Tooltip } from 'components';
import { TEST_TYPES_COLOR } from 'common/constants';
import { TestsToRun } from 'types/tests-to-run';
import { TestTypes } from 'types/test-types';
import { useBuildVersion } from '../../coverage-plugin/use-build-version';
import { SingleBar } from '../single-bar';
import { Section } from './section';
import { SectionTooltip } from './section-tooltip';

export const TestsToRunSection = () => {
  const { testTypeToNames = {} } = useBuildVersion<TestsToRun>('/build/tests-to-run') || {};
  const totalCoveredMethodCount = Object.values(testTypeToNames).reduce(
    (acc, tests) => acc + tests.length,
    0,
  );
  const tooltipData = Object.keys(testTypeToNames).reduce(
    (acc, testType) => ({
      ...acc,
      [testType.toLowerCase()]: {
        count: testTypeToNames[testType].length,
        color: TEST_TYPES_COLOR[testType as TestTypes],
      },
    }),
    {},
  );

  return (
    <Section
      label="Tests to run"
      info={totalCoveredMethodCount}
      graph={(
        <Tooltip
          message={totalCoveredMethodCount > 0 && <SectionTooltip data={tooltipData} hideValue />}
        >
          <Panel>
            <SingleBar
              width={48}
              height={128}
              color="#9600FF"
              percent={(testTypeToNames.AUTO && testTypeToNames.AUTO.length / totalCoveredMethodCount) * 100}
              icon="Auto"
            />
            <SingleBar
              width={48}
              height={128}
              color="#00D5FF"
              percent={
                (testTypeToNames.MANUAL && testTypeToNames.MANUAL.length / totalCoveredMethodCount) * 100
              }
              icon="Manual"
            />
            <SingleBar
              width={48}
              height={128}
              color="#E78E00"
              percent={
                (testTypeToNames.PERFORMANCE
                  && testTypeToNames.PERFORMANCE.length / totalCoveredMethodCount) * 100
              }
              icon="Perf"
            />
          </Panel>
        </Tooltip>
      )}
    />
  );
};
