/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
