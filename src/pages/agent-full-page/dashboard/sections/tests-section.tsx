import * as React from 'react';
import { Panel, Tooltip } from '@drill4j/ui-kit';

import { TESTS_TYPES_COLOR } from 'common/constants';
import { BuildCoverage } from 'types/build-coverage';
import { TestTypes } from 'types/test-types';
import { capitalize } from 'utils';
import { TestsInfo } from 'types/tests-info';
import { useBuildVersion } from '../../coverage-plugin/use-build-version';
import { SingleBar } from '../single-bar';
import { Section } from './section';
import { SectionTooltip } from './section-tooltip';

export const TestsSection = () => {
  const { byTestType = [], finishedScopesCount = 0 } = useBuildVersion<BuildCoverage>('/build/coverage') || {};
  const totalCoveredMethodCount = byTestType.reduce((acc, { summary: { testCount = 0 } }) => acc + testCount, 0);
  const testsInfo: TestsInfo = byTestType.reduce((test, testType) => ({ ...test, [testType.type]: testType }), {});
  const tooltipData = Object.keys(testsInfo).reduce(
    (acc, testType) => ({
      ...acc,
      [testType.toLowerCase()]: {
        value: testsInfo[testType].summary.coverage?.percentage,
        count: testsInfo[testType].summary.testCount,
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
                percent={(testsInfo[testType] && (testsInfo[testType].summary.testCount || 0) / totalCoveredMethodCount) * 100}
                icon={testType === 'PERFORMANCE' ? 'Perf' : capitalize(testType)}
              />
            ))}
          </Panel>
        </Tooltip>
      )}
    />
  );
};
