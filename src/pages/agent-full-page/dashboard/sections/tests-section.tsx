import * as React from 'react';

import { Panel } from '../../../../layouts';
import { Tooltip } from '../../../../components';
import { TEST_TYPES_COLOR } from '../../../../common/constants';
import { useBuildVersion } from '../../coverage-plugin/use-build-version';
import { SingleBar } from '../single-bar';
import { Section } from './section';
import { Coverage } from '../../../../types/coverage';
import { SectionTooltip } from './section-tooltip';
import { TestTypes } from '../../../../types/test-types';

export const TestsSection = () => {
  const { coverageByType = {}, finishedScopesCount = 0 } =
    useBuildVersion<Coverage>(`/build/coverage`) || {};
  const totalCoveredMethodCount = Object.values(coverageByType).reduce(
    (acc, { testCount }) => acc + testCount,
    0,
  );
  const tooltipData = Object.keys(coverageByType).reduce(
    (acc, testType) => ({
      ...acc,
      [testType.toLowerCase()]: {
        value: coverageByType[testType].coverage,
        count: coverageByType[testType].testCount,
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
      graph={
        <Tooltip message={totalCoveredMethodCount > 0 && <SectionTooltip data={tooltipData} />}>
          <Panel>
            <SingleBar
              width={48}
              height={128}
              color={TEST_TYPES_COLOR.AUTO}
              percent={
                (coverageByType.AUTO && coverageByType.AUTO.testCount / totalCoveredMethodCount) *
                100
              }
              icon="Auto"
            />
            <SingleBar
              width={48}
              height={128}
              color={TEST_TYPES_COLOR.MANUAL}
              percent={
                (coverageByType.MANUAL &&
                  coverageByType.MANUAL.testCount / totalCoveredMethodCount) * 100
              }
              icon="Manual"
            />
            <SingleBar
              width={48}
              height={128}
              color={TEST_TYPES_COLOR.PERFORMANCE}
              percent={
                (coverageByType.PERFORMANCE &&
                  coverageByType.PERFORMANCE.testCount / totalCoveredMethodCount) * 100
              }
              icon="Perf"
            />
          </Panel>
        </Tooltip>
      }
    />
  );
};
