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
import { Tooltip } from '@drill4j/ui-kit';

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
          <div className="flex items-center w-full">
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
          </div>
        </Tooltip>
      )}
    />
  );
};
