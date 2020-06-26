import * as React from 'react';
import { Panel, Tooltip } from '@drill4j/ui-kit';

import { TESTS_TYPES_COLOR } from 'common/constants';
import { BuildCoverage } from 'types/build-coverage';
import { TestTypes } from 'types/test-types';
import { capitalize } from 'utils';
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
        color: TESTS_TYPES_COLOR[testType as TestTypes],
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
            {Object.keys(TESTS_TYPES_COLOR).map((testType) => (
              <SingleBar
                key={testType}
                width={48}
                height={128}
                color={TESTS_TYPES_COLOR[testType as TestTypes]}
                percent={(byTestType[testType] && byTestType[testType].testCount / totalCoveredMethodCount) * 100}
                icon={testType === 'PERFORMANCE' ? 'Perf' : capitalize(testType)}
              />
            ))}
          </Panel>
        </Tooltip>
      )}
    />
  );
};
