import * as React from 'react';
import { Panel, Tooltip } from '@drill4j/ui-kit';

import { SingleBar, DashboardSection, SectionTooltip } from 'components';
import { TESTS_TYPES_COLOR } from 'common/constants';
import { BuildCoverage } from 'types/build-coverage';
import { TestTypes } from 'types/test-types';
import { capitalize, convertToPercentage } from 'utils';
import { TestsInfo } from 'types/tests-info';
import { useBuildVersion } from 'hooks';

export const TestsSection = () => {
  const { byTestType = [], finishedScopesCount = 0 } = useBuildVersion<BuildCoverage>('/build/coverage') || {};
  const totalCoveredMethodCount = byTestType.reduce((acc, { summary: { testCount = 0 } }) => acc + testCount, 0);
  const testsInfo: TestsInfo = byTestType.reduce((test, testType) => ({ ...test, [testType.type]: testType }), {});
  const tooltipData = {
    auto: {
      value: testsInfo?.AUTO?.summary.coverage?.percentage,
      count: testsInfo?.AUTO?.summary.testCount,
      color: TESTS_TYPES_COLOR.AUTO,
    },
    manual: {
      value: testsInfo?.MANUAL?.summary.coverage?.percentage,
      count: testsInfo?.MANUAL?.summary.testCount,
      color: TESTS_TYPES_COLOR.MANUAL,
    },
  };

  return (
    <DashboardSection
      label="Tests"
      info={totalCoveredMethodCount}
      additionalInfo={`${finishedScopesCount} scopes`}
      graph={(
        <Tooltip message={<SectionTooltip data={tooltipData} />}>
          <Panel>
            {Object.keys(TESTS_TYPES_COLOR).map((testType) => (
              <SingleBar
                key={testType}
                width={64}
                height={128}
                color={TESTS_TYPES_COLOR[testType as TestTypes]}
                percent={convertToPercentage((testsInfo[testType] && testsInfo[testType].summary.testCount) || 0, totalCoveredMethodCount)}
                icon={capitalize(testType)}
              />
            ))}
          </Panel>
        </Tooltip>
      )}
    />
  );
};
