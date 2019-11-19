import * as React from 'react';

import { Panel } from '../../../../layouts';
import { Tooltip } from '../../../../components';
import { TEST_TYPES_COLOR } from '../../../../common/constants';
import { useBuildVersion } from '../../coverage-plugin/use-build-version';
import { SingleBar } from '../single-bar';
import { Section } from './section';
import { TestsToRun } from '../../../../types/tests-to-run';
import { SectionTooltip } from './section-tooltip';
import { TestTypes } from '../../../../types/test-types';

export const TestsToRunSection = () => {
  const { testsToRun = {} } = useBuildVersion<TestsToRun>(`/build/tests-to-run`) || {};
  const totalCoveredMethodCount = Object.values(testsToRun).reduce(
    (acc, tests) => acc + tests.length,
    0,
  );
  const tooltipData = Object.keys(testsToRun).reduce(
    (acc, testType) => ({
      ...acc,
      [testType]: {
        count: testsToRun[testType].length,
        color: TEST_TYPES_COLOR[testType as TestTypes],
      },
    }),
    {},
  );

  return (
    <Section
      label="Tests to run"
      info={totalCoveredMethodCount}
      graph={
        <Tooltip
          message={totalCoveredMethodCount > 0 && <SectionTooltip data={tooltipData} hideValue />}
        >
          <Panel>
            <SingleBar
              width={48}
              height={128}
              color="#9600FF"
              percent={(testsToRun.AUTO && testsToRun.AUTO.length / totalCoveredMethodCount) * 100}
              icon="Auto"
            />
            <SingleBar
              width={48}
              height={128}
              color="#00D5FF"
              percent={
                (testsToRun.MANUAL && testsToRun.MANUAL.length / totalCoveredMethodCount) * 100
              }
              icon="Manual"
            />
            <SingleBar
              width={48}
              height={128}
              color="#E78E00"
              percent={
                (testsToRun.PERFORMANCE &&
                  testsToRun.PERFORMANCE.length / totalCoveredMethodCount) * 100
              }
              icon="Perf"
            />
          </Panel>
        </Tooltip>
      }
    />
  );
};
