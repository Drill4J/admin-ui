import * as React from 'react';
import { Panel, Tooltip } from '@drill4j/ui-kit';

import { SingleBar, DashboardSection, SectionTooltip } from 'components';
import { capitalize, convertToPercentage } from 'utils';
import { TESTS_TO_RUN_TYPES_COLOR } from 'common/constants';
import { TestTypes } from 'types/test-types';
import { TestCount } from 'types/test-count';

interface Props {
  testsToRun?: TestCount;
}

export const TestsToRunSection = ({ testsToRun: { count = 0, byType = {} } = {} }: Props) => {
  const tooltipData = {
    auto: {
      count: byType?.AUTO,
      color: TESTS_TO_RUN_TYPES_COLOR.AUTO,
    },
    manual: {
      count: byType?.MANUAL,
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
                percent={convertToPercentage(byType[testType as TestTypes], count)}
                icon={capitalize(testType)}
              />
            ))}
          </Panel>
        </Tooltip>
      )}
    />
  );
};
