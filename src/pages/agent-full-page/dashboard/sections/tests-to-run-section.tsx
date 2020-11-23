import * as React from 'react';
import { Panel, Tooltip } from '@drill4j/ui-kit';

import { SingleBar, DashboardSection, SectionTooltip } from 'components';
import { capitalize, convertToPercentage } from 'utils';
import { TESTS_TO_RUN_TYPES_COLOR } from 'common/constants';
import { BuildSummary } from 'types/build-summary';
import { TestTypes } from 'types/test-types';
import { useBuildVersion } from 'hooks';

export const TestsToRunSection = () => {
  const { testsToRun: { count = 0, byType: testsToRunByType = {} } = {} } = useBuildVersion<BuildSummary>('/build/summary') || {};
  const tooltipData = {
    auto: {
      count: testsToRunByType?.AUTO,
      color: TESTS_TO_RUN_TYPES_COLOR.AUTO,
    },
    manual: {
      count: testsToRunByType?.MANUAL,
      color: TESTS_TO_RUN_TYPES_COLOR.MANUAL,
    },
  };

  return (
    <DashboardSection
      label="Tests to run"
      info={count}
      graph={(
        <Tooltip message={<SectionTooltip data={tooltipData} hideValue />}>
          <Panel>
            {Object.keys(TESTS_TO_RUN_TYPES_COLOR).map((testType) => (
              <SingleBar
                key={testType}
                width={64}
                height={128}
                color={TESTS_TO_RUN_TYPES_COLOR[testType as TestTypes]}
                percent={convertToPercentage(testsToRunByType[testType as TestTypes], count)}
                icon={capitalize(testType)}
              />
            ))}
          </Panel>
        </Tooltip>
      )}
    />
  );
};
