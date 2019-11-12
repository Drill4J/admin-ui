import * as React from 'react';

import { Panel } from '../../../../../layouts';
import { Tooltip } from '../../../../../components';
import { useBuildVersion } from '../../../coverage-plugin/use-build-version';
import { SingleBar } from '../../single-bar';
import { Section } from '../section';
import { TestsTooltip } from './tests-tooltip';
import { Coverage } from '../../../../../types/coverage';

export const TestsSection = () => {
  const { coverageByType = {}, scopesCount = 0 } =
    useBuildVersion<Coverage>(`/build/coverage`) || {};
  const totalCoveredMethodCount = Object.values(coverageByType).reduce(
    (acc, { testCount }) => acc + testCount,
    0,
  );

  return (
    <Section
      label="Tests"
      info={totalCoveredMethodCount}
      additionalInfo={`${scopesCount} scopes`}
      graph={
        <Tooltip message={<TestsTooltip coverageByType={coverageByType} />}>
          <Panel>
            <SingleBar
              width={64}
              height={128}
              color="#9600FF"
              percent={
                (coverageByType.AUTO && coverageByType.AUTO.testCount / totalCoveredMethodCount) *
                100
              }
              icon="Auto"
            />
            <SingleBar
              width={64}
              height={128}
              color="#00D5FF"
              percent={
                (coverageByType.MANUAL &&
                  coverageByType.MANUAL.testCount / totalCoveredMethodCount) * 100
              }
              icon="Manual"
            />
            <SingleBar
              width={64}
              height={128}
              color="#E78E00"
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
