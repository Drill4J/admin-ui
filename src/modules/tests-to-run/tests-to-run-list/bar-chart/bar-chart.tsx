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
import { useEffect, useRef, useState } from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Tooltip } from '@drill4j/ui-kit';
import { nanoid } from 'nanoid';

import { DATA_VISUALIZATION_COLORS } from 'common/constants';
import { useBuildVersion, useElementSize } from 'hooks';
import { TestsToRunSummary } from 'types/tests-to-run-summary';
import { getDuration, percentFormatter } from 'utils';
import { getTimeFormat, getYScale } from './helpers';
import {
  BAR_HORIZONTAL_PADDING_PX, BAR_WITH_GAP_WIDTH_PX, CHART_HEIGHT_PX, BORDER_PX,
} from './constants';

import styles from './bar-chart.module.scss';

interface Props {
  className?: string;
  activeBuildVersion: string;
  totalDuration: number;
  summaryTestsToRun: TestsToRunSummary;
}

const barChart = BEM(styles);

export const BarChart = barChart(({
  className, activeBuildVersion, totalDuration, summaryTestsToRun,
}: Props) => {
  const ref = useRef(null);
  const { width } = useElementSize(ref);
  const [slice, setSlice] = useState(0);
  const visibleBarsCount = Math.floor((width - BAR_HORIZONTAL_PADDING_PX) / BAR_WITH_GAP_WIDTH_PX);

  useEffect(() => {
    setSlice(visibleBarsCount);
  }, [width, visibleBarsCount]);

  const testsToRunParentStats = useBuildVersion<TestsToRunSummary[]>('/build/tests-to-run/parent-stats') || [];
  const testsToRunHistory = [...testsToRunParentStats, summaryTestsToRun];

  const sliceTestsToRunHistory = testsToRunHistory.slice(testsToRunHistory.length - slice, slice
    ? testsToRunHistory.length + visibleBarsCount - slice
    : testsToRunHistory.length);
  const bars = visibleBarsCount > testsToRunHistory.length ? testsToRunHistory : sliceTestsToRunHistory;

  const yScale = getYScale(totalDuration);

  return (
    <div className={className} ref={ref}>
      <YAxis style={
        {
          height: `${CHART_HEIGHT_PX}px`,
          gridTemplateRows: `repeat(${yScale.stepsCount}, ${CHART_HEIGHT_PX / yScale.stepsCount}px)`,
        }
      }
      >
        {
          Array.from({ length: yScale.stepsCount },
            (_, i) => (
              <div
                key={nanoid()}
                data-content={`${getTimeFormat((i + 1) * yScale.stepSizeMs, yScale.unit)}${yScale.unit}`}
              />
            )).reverse()
        }
      </YAxis>
      <Chart>
        <CartesianLayout style={
          {
            height: `${CHART_HEIGHT_PX}px`,
            gridTemplateColumns: `repeat(${visibleBarsCount}, 64px)`,
          }
        }
        >
          {bars.map(({ buildVersion, statsByType: { AUTO: { total = 0, completed = 0, duration = 0 } = {} } = {} }) => {
            const isAllAutoTestsDone = Boolean(total) && completed === total;

            const MIN_DURATION_HEIGHT_PX = completed ? 4 : 0; // min height in px required by UX design

            const msPerPx = CHART_HEIGHT_PX / (yScale.stepSizeMs * yScale.stepsCount);
            const durationHeight = duration < totalDuration
              ? Math.max(msPerPx * duration - BORDER_PX, MIN_DURATION_HEIGHT_PX)
              : msPerPx * totalDuration - BORDER_PX;

            const savedTimeMs = totalDuration - duration;
            const savedTimeHeight = msPerPx * savedTimeMs - (durationHeight > 4 ? 0 : MIN_DURATION_HEIGHT_PX);

            const { hours, minutes, seconds } = getDuration(duration);
            const savedTimeDuration = getDuration(totalDuration - duration);
            const durationType = isAllAutoTestsDone ? 'all-tests-done-duration' : 'duration';
            const hasUncompletedTests = completed > 0 && completed < total;
            return (
              <Tooltip message={(hasUncompletedTests && buildVersion !== activeBuildVersion) && (
                <div className="d-flex flex-column align-items-center w-100">
                  <span>Not all the suggested Auto Tests</span>
                  <span>were run in this build</span>
                </div>
              )}
              >
                <GroupedBars bordered={!isAllAutoTestsDone} hasUncompletedTests={hasUncompletedTests} key={nanoid()}>
                  <Tooltip message={(hasUncompletedTests && buildVersion !== activeBuildVersion) ? null : (
                    <>
                      {!total && 'No Auto Tests suggested to run in this build'}
                      {isAllAutoTestsDone && (
                        <SavedTimePercent>
                          Total time saved: {savedTimeDuration.hours}:{savedTimeDuration.minutes}:{savedTimeDuration.seconds}
                          <span>{percentFormatter((1 - duration / totalDuration) * 100)}%</span>
                        </SavedTimePercent>
                      )}
                      {Boolean(total) && !isAllAutoTestsDone && (
                        <div className="d-flex flex-column align-items-center w-100">
                          <span>
                            {`${completed
                              ? 'Not all'
                              : 'None'} of the suggested Auto Tests`}
                          </span>
                          <span>were run in this build</span>
                        </div>
                      )}
                    </>
                  )}
                  >
                    <Bar
                      type={buildVersion !== activeBuildVersion
                        ? 'saved-time'
                        : undefined}
                      style={{
                        height: `${savedTimeHeight}px`,
                        backgroundColor: isAllAutoTestsDone ? DATA_VISUALIZATION_COLORS.SAVED_TIME : 'transparent',
                      }}
                    />
                  </Tooltip>
                  <Tooltip message={(isAllAutoTestsDone || buildVersion === activeBuildVersion) && (
                    <div className="text-center">
                      {duration >= totalDuration && <div>No time was saved in this build.</div>}
                      <div>Auto Tests {!isAllAutoTestsDone && 'current'} duration with Drill4J: {hours}:{minutes}:{seconds}</div>
                    </div>
                  )}
                  >
                    <Bar
                      type={buildVersion !== activeBuildVersion
                        ? durationType
                        : 'active'}
                      style={{ height: `${durationHeight}px` }}
                    />
                  </Tooltip>
                </GroupedBars>
              </Tooltip>
            );
          })}
        </CartesianLayout>
        <input
          style={{ width: `${visibleBarsCount > testsToRunHistory.length ? 0 : width}px` }}
          type="range"
          min={visibleBarsCount}
          value={slice || bars.length}
          max={testsToRunHistory.length}
          onChange={(event) => setSlice(Number(event.currentTarget.value))}
        />
        <XAxis>
          <span>Build</span>
          <XAxisLegend style={{ gridTemplateColumns: `repeat(${visibleBarsCount}, 64px)` }}>
            {bars.map(({ buildVersion }) => <div key={nanoid()} title={buildVersion}>{buildVersion}</div>)}
          </XAxisLegend>
        </XAxis>
      </Chart>
    </div>
  );
});

const Chart = barChart.chart('div');
const CartesianLayout = barChart.cartesianLayout('div');
const GroupedBars = barChart.groupedBars(div({} as { bordered?: boolean, hasUncompletedTests?: boolean }));
const Bar = barChart.bar('div');
const YAxis = barChart.yAxis('div');
const XAxis = barChart.xAxis('div');
const XAxisLegend = barChart.xAxisLegend('div');
const SavedTimePercent = barChart.savedTimePercent('div');
