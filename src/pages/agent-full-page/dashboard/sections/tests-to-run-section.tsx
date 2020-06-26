import * as React from 'react';
import { Panel, Tooltip } from '@drill4j/ui-kit';

import { TESTS_TO_RUN_TYPES_COLOR } from 'common/constants';
import { TestsToRun } from 'types/tests-to-run';
import { TestTypes } from 'types/test-types';
import { capitalize } from 'utils';
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
        color: TESTS_TO_RUN_TYPES_COLOR[testType as TestTypes],
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
            {Object.keys(TESTS_TO_RUN_TYPES_COLOR).map((testType) => (
              <SingleBar
                key={testType}
                width={48}
                height={128}
                color={TESTS_TO_RUN_TYPES_COLOR[testType as TestTypes]}
                percent={(testTypeToNames[testType] && testTypeToNames[testType].length / totalCoveredMethodCount) * 100}
                icon={testType === 'PERFORMANCE' ? 'Perf' : capitalize(testType)}
              />
            ))}
          </Panel>
        </Tooltip>
      )}
    />
  );
};
