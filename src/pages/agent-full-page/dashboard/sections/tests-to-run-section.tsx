import * as React from 'react';
import { Panel, Tooltip } from '@drill4j/ui-kit';

import { SingleBar } from 'components';
import { capitalize } from 'utils';
import { TESTS_TO_RUN_TYPES_COLOR } from 'common/constants';
import { TestTypeCount } from 'types/test-type-count';
import { TestToRunInfo } from 'types/test-to-run-info';
import { TestTypes } from 'types/test-types';
import { useBuildVersion } from 'hooks';
import { Section } from './section';
import { SectionTooltip } from './section-tooltip';

export const TestsToRunSection = () => {
  const testsToRun = useBuildVersion<TestTypeCount[]>('/build/summary/tests-to-run/by-type') || [];
  const totalTestsToRunCount = testsToRun.reduce((acc, { count }) => acc + count, 0);
  const testsToRunInfo: TestToRunInfo = testsToRun.reduce((acc, testToRun) => ({
    ...acc, [testToRun.type]: { count: testToRun.count },
  }), { AUTO: { count: 0 }, MANUAL: { count: 0 } });
  const tooltipData = {
    auto: {
      count: testsToRunInfo.AUTO.count,
      color: TESTS_TO_RUN_TYPES_COLOR.AUTO,
    },
    manual: {
      count: testsToRunInfo.MANUAL.count,
      color: TESTS_TO_RUN_TYPES_COLOR.MANUAL,
    },
  };

  return (
    <Section
      label="Tests to run"
      info={totalTestsToRunCount}
      graph={(
        <Tooltip
          customStyle={{ left: 'calc(50% - 2px)', bottom: 'calc(100% + 12px)' }}
          message={<SectionTooltip data={tooltipData} hideValue />}
        >
          <Panel>
            {Object.keys(TESTS_TO_RUN_TYPES_COLOR).map((testType) => (
              <SingleBar
                key={testType}
                width={64}
                height={128}
                color={TESTS_TO_RUN_TYPES_COLOR[testType as TestTypes]}
                percent={(testsToRunInfo[testType as TestTypes].count / totalTestsToRunCount) * 100}
                icon={capitalize(testType)}
              />
            ))}
          </Panel>
        </Tooltip>
      )}
    />
  );
};
