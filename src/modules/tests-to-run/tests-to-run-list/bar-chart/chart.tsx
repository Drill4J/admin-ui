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
import { Tooltip } from '@drill4j/ui-kit';
import { BEM, div } from '@redneckz/react-bem-helper';
import { nanoid } from 'nanoid';

import { useIntersection } from 'hooks';
import { getDuration, percentFormatter } from 'utils';
import { DATA_VISUALIZATION_COLORS } from 'common/constants';
import { TestsToRunSummary } from 'types/tests-to-run-summary';

import styles from './bar-chart.module.scss';

const barChart = BEM(styles);

const CHART_HEIGHT_PX = 160;
const BORDER_PX = 1;

interface Props {
  chartData?: TestsToRunSummary;
  activeBuildVersion?: string;
  totalDuration?: number;
  yScale: { stepSizeMs: number, unit: string, stepsCount: number };
  isVisibleTooltip: boolean;
}

export const Chart = ({
  activeBuildVersion, totalDuration = 0, yScale, isVisibleTooltip, chartData: { buildVersion, statsByType } = {},
}: Props) => {
  const { AUTO: { total = 0, completed = 0, duration = 0 } = {} } = statsByType || {};
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
  const ref = useRef(null);
  const isVisibleSecondChart = useIntersection(ref);

  return (
    <Tooltip message={isVisibleTooltip && (hasUncompletedTests && buildVersion !== activeBuildVersion) && (
      <div className="flex flex-col items-center w-full">
        <span>Not all the suggested Auto Tests</span>
        <span>were run in this build</span>
      </div>
    )}
    >
      <GroupedBars bordered={!isAllAutoTestsDone} hasUncompletedTests={hasUncompletedTests} key={nanoid()}>
        <Tooltip message={!isVisibleTooltip || (hasUncompletedTests && buildVersion !== activeBuildVersion) ? null : (
          <>
            {!total && 'No Auto Tests suggested to run in this build'}
            {isAllAutoTestsDone && (
              <SavedTimePercent>
                Total time saved: {savedTimeDuration.hours}:{savedTimeDuration.minutes}:{savedTimeDuration.seconds}
                <span>{percentFormatter((1 - duration / totalDuration) * 100)}%</span>
              </SavedTimePercent>
            )}
            {Boolean(total) && !isAllAutoTestsDone && (
              <div className="flex flex-col items-center w-full">
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
          <ChartBlock
            type={buildVersion !== activeBuildVersion
              ? 'saved-time'
              : undefined}
            style={{
              height: `${savedTimeHeight}px`,
              backgroundColor: isAllAutoTestsDone ? DATA_VISUALIZATION_COLORS.SAVED_TIME : 'transparent',
            }}
          />
        </Tooltip>
        <Tooltip message={isVisibleSecondChart && (isAllAutoTestsDone || buildVersion === activeBuildVersion) && (
          <div className="text-center">
            {duration >= totalDuration && <div>No time was saved in this build.</div>}
            <div>Auto Tests {!isAllAutoTestsDone && 'current'} duration with Drill4J: {hours}:{minutes}:{seconds}</div>
          </div>
        )}
        >
          <div ref={ref}>
            <ChartBlock
              type={buildVersion !== activeBuildVersion
                ? durationType
                : 'active'}
              style={{ height: `${durationHeight}px` }}
            />
          </div>
        </Tooltip>
      </GroupedBars>
    </Tooltip>
  );
};

const GroupedBars = barChart.groupedBars(div({} as { bordered?: boolean, hasUncompletedTests?: boolean }));
const ChartBlock = barChart.bar('div');
const SavedTimePercent = barChart.savedTimePercent('div');
