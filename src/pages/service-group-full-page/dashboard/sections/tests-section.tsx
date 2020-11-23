import * as React from 'react';
import { Panel, Tooltip } from '@drill4j/ui-kit';

import { SingleBar, DashboardSection, SectionTooltip } from 'components';
import { TESTS_TYPES_COLOR } from 'common/constants';
import { TestTypes } from 'types/test-types';
import { TestTypeSummary } from 'types/test-type-summary';
import { capitalize, convertToPercentage } from 'utils';

interface Props {
  testsType?: TestTypeSummary[];
  scopeCount?: number;
}

export const TestsSection = ({ scopeCount = 0, testsType = [] }: Props) => {
  const testsByType: Record<string, { count: number; percentage: number; }> = testsType.reduce(
    (acc, { summary: { coverage: { percentage = 0 } = {}, testCount = 0 }, type }) => ({
      ...acc,
      [type]: {
        count: testCount,
        percentage,
      },
    }),
    {},
  );
  const totalTestsCount = Object.keys(testsByType).reduce((acc, testType) => acc + testsByType[testType].count, 0);
  const tooltipData = {
    auto: {
      value: testsByType?.AUTO?.percentage,
      count: testsByType?.AUTO?.count,
      color: TESTS_TYPES_COLOR.AUTO,
    },
    manual: {
      value: testsByType?.MANUAL?.percentage,
      count: testsByType?.MANUAL?.count,
      color: TESTS_TYPES_COLOR.MANUAL,
    },
  };

  return (
    <DashboardSection
      label="Tests"
      info={totalTestsCount}
      additionalInfo={`${scopeCount} scopes`}
      graph={(
        <Tooltip message={<SectionTooltip data={tooltipData} />}>
          <Panel>
            {Object.keys(TESTS_TYPES_COLOR).map((testType) => (
              <SingleBar
                key={testType}
                width={64}
                height={128}
                color={TESTS_TYPES_COLOR[testType as TestTypes]}
                percent={convertToPercentage(testsByType[testType] && (testsByType[testType].count || 0), totalTestsCount)}
                icon={capitalize(testType)}
              />
            ))}
          </Panel>
        </Tooltip>
      )}
    />
  );
};
