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
import { useRef } from 'react';
import { Legend, Tooltip } from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { DATA_VISUALIZATION_COLORS } from 'common/constants';
import { TestsInfo } from 'types/tests-info';
import { percentFormatter } from 'utils';
import { useElementSize } from 'hooks';

interface Props {
  testsInfo: TestsInfo;
}

const TestsBar = styled.div(({ type }: { type: 'auto' | 'manual' }) => [
  tw`h-8 opacity-50 hover:opacity-100`,
  type === 'auto' && tw`bg-data-visualization-auto`,
  type === 'manual' && tw`bg-data-visualization-manual`,
]);

export const ActiveBuildTestsInfo = ({ testsInfo }: Props) => {
  const {
    AUTO: {
      summary: {
        testCount: autoTestsCount = 0,
        coverage: { percentage: autoTestsPercentage = 0 } = {},
      } = {},
    } = {},
    MANUAL: {
      summary: {
        testCount: manualTestsCount = 0,
        coverage: { percentage: manualTestsPercentage = 0 } = {},
      } = {},
    } = {},
  } = testsInfo;
  const testsExecuted = autoTestsCount + manualTestsCount;
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(ref);
  const autoTestsBarWidth = (autoTestsCount / testsExecuted) * width;
  const manualTestsBarWidth = (manualTestsCount / testsExecuted) * width;
  const minBarWidth = 4;
  const { scopeId = '' } = useParams<{ scopeId?: string }>();

  return (
    <div tw="text-12 leading-16 text-monochrome-default" ref={ref}>
      <div className="flex justify-between items-center w-full">
        <div tw="font-bold" data-test="active-build-tests-info:title">
          TESTS EXECUTION
        </div>
        <Legend
          legendItems={[
            { label: 'Auto', color: DATA_VISUALIZATION_COLORS.AUTO },
            { label: 'Manual', color: DATA_VISUALIZATION_COLORS.MANUAL },
          ]}
        />
      </div>
      <div tw="flex gap-1 items-baseline mt-6 mb-3">
        <div
          tw="text-32 leading-40 text-monochrome-black"
          data-test="active-build-tests-info:executed-tests"
        >
          {testsExecuted}
        </div>
        &nbsp;tests executed in {scopeId ? 'scope' : 'build'}
      </div>
      <div
        tw="relative h-8 bg-monochrome-light-tint rounded overflow-hidden"
        data-test="active-build-tests-info:executed-tests-bar"
      >
        <div style={{ position: 'absolute' }}>
          {Boolean(autoTestsCount) && (
            <Tooltip
              message={`${autoTestsCount} Auto tests covered ${percentFormatter(
                autoTestsPercentage,
              )}% of application in the current ${scopeId ? 'scope' : 'build'}`}
            >
              <TestsBar
                type="auto"
                style={{
                  width: `${Math.max(
                    autoTestsBarWidth > minBarWidth
                      ? autoTestsBarWidth
                      : autoTestsBarWidth - (minBarWidth - manualTestsBarWidth),
                    minBarWidth,
                  )}px`,
                }}
              />
            </Tooltip>
          )}
          {Boolean(manualTestsCount) && (
            <Tooltip
              message={`${manualTestsCount} Manual tests covered ${percentFormatter(
                manualTestsPercentage,
              )}% of application in the current ${scopeId ? 'scope' : 'build'}`}
            >
              <TestsBar
                type="manual"
                style={{
                  width: `${Math.max(
                    manualTestsBarWidth > minBarWidth
                      ? manualTestsBarWidth
                      : manualTestsBarWidth - (minBarWidth - autoTestsBarWidth),
                    minBarWidth,
                  )}px`,
                }}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};
