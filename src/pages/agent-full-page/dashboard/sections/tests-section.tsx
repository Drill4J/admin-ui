import * as React from 'react';

import { Panel } from 'layouts';
import { Tooltip } from 'components';
import { TEST_TYPES_COLOR } from 'common/constants';
import { BuildCoverage } from 'types/build-coverage';
import { TestTypes } from 'types/test-types';
import { useBuildVersion } from '../../coverage-plugin/use-build-version';
import { SingleBar } from '../single-bar';
import { Section } from './section';
import { SectionTooltip } from './section-tooltip';

export const TestsSection = () => {
  const { byTestType = {}, finishedScopesCount = 0 } = useBuildVersion<BuildCoverage>('/build/coverage') || {};
  const totalCoveredMethodCount = Object.values(byTestType).reduce(
    (acc, { testCount }) => acc + testCount,
    0,
  );
  const tooltipData = Object.keys(byTestType).reduce(
    (acc, testType) => ({
      ...acc,
      [testType.toLowerCase()]: {
        value: byTestType[testType].coverage,
        count: byTestType[testType].testCount,
        color: TEST_TYPES_COLOR[testType as TestTypes],
      },
    }),
    {},
  );

  return (
    <Section
      label="Tests"
      info={totalCoveredMethodCount}
      additionalInfo={`${finishedScopesCount} scopes`}
      graph={(
        <Tooltip message={totalCoveredMethodCount > 0 && <SectionTooltip data={tooltipData} />}>
          <Panel>
            <SingleBar
              width={48}
              height={128}
              color={TEST_TYPES_COLOR.AUTO}
              percent={
                (byTestType.AUTO && byTestType.AUTO.testCount / totalCoveredMethodCount)
                * 100
              }
              icon="Auto"
            />
            <SingleBar
              width={48}
              height={128}
              color={TEST_TYPES_COLOR.MANUAL}
              percent={
                (byTestType.MANUAL
                  && byTestType.MANUAL.testCount / totalCoveredMethodCount) * 100
              }
              icon="Manual"
            />
            <SingleBar
              width={48}
              height={128}
              color={TEST_TYPES_COLOR.PERFORMANCE}
              percent={
                (byTestType.PERFORMANCE
                  && byTestType.PERFORMANCE.testCount / totalCoveredMethodCount) * 100
              }
              icon="Perf"
            />
          </Panel>
        </Tooltip>
      )}
    />
  );
};
