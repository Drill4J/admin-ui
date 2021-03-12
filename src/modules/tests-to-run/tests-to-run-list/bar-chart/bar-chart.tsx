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
import {
  useEffect, useRef, useState,
} from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { nanoid } from 'nanoid';
import tw, { styled } from 'twin.macro';

import { useBuildVersion, useElementSize, useIntersection } from 'hooks';
import { TestsToRunSummary } from 'types/tests-to-run-summary';
import {
  convertToPercentage,
} from 'utils';
import { Chart } from './chart';

import styles from './bar-chart.module.scss';

interface Props {
  className?: string;
  activeBuildVersion: string;
  totalDuration: number;
  summaryTestsToRun: TestsToRunSummary;
}

const barChart = BEM(styles);

const BAR_HORIZONTAL_PADDING_PX = 96;
const BAR_WITH_GAP_WIDTH_PX = 112;
const CHART_HEIGHT_PX = 160;

const CartesianLayout = styled.div`
  ${tw`grid items-end gap-12 px-12 border-b border-monochrome-black`}
`;

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

  const sliderThumb = convertToPercentage(visibleBarsCount, testsToRunHistory.length);

  const bars = visibleBarsCount > testsToRunHistory.length
    ? testsToRunHistory
    : testsToRunHistorySlice(testsToRunHistory, slice, visibleBarsCount);
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
      <ChartBlock>
        <CartesianLayout
          style={
            {
              height: `${CHART_HEIGHT_PX}px`,
              gridTemplateColumns: `repeat(${visibleBarsCount}, 64px)`,
            }
          }
        >
          {bars.map((bar) => (
            <Chart
              chartData={bar}
              activeBuildVersion={activeBuildVersion}
              yScale={yScale}
              totalDuration={totalDuration}
              key={bar.buildVersion}
            />
          ))}
        </CartesianLayout>
        {/* This hack is needed to dynamically change the slider of a custom scrollbar */}
        <style type="text/css">
          #custom-scroll-bar::-webkit-slider-thumb &#123;
          width: {sliderThumb}% !important;
        </style>
        <input
          id="custom-scroll-bar"
          type="range"
          min={visibleBarsCount > testsToRunHistory.length ? 0 : visibleBarsCount}
          style={{
            width: `${visibleBarsCount <= 0 || visibleBarsCount >= testsToRunHistory.length ? 0 : width - 30}px`,
            marginBottom: `${visibleBarsCount <= 0 || visibleBarsCount >= testsToRunHistory.length ? 0 : 8}px`,
          }}
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
      </ChartBlock>
    </div>
  );
});

const ChartBlock = barChart.chart('div');
const YAxis = barChart.yAxis('div');
const XAxis = barChart.xAxis('div');
const XAxisLegend = barChart.xAxisLegend('div');

const MS_IN_SECONDS = 1000;
const MS_IN_MINUTES = MS_IN_SECONDS * 60;
const MS_IN_HOURS = MS_IN_MINUTES * 60;

const graphParams = [
  {
    duration: 100 * MS_IN_HOURS,
    step: 25 * MS_IN_HOURS,
    unit: 'h',
  },
  {
    duration: 90 * MS_IN_HOURS,
    step: 30 * MS_IN_HOURS,
    unit: 'h',
  },
  {
    duration: 60 * MS_IN_HOURS,
    step: 20 * MS_IN_HOURS,
    unit: 'h',
  },
  {
    duration: 45 * MS_IN_HOURS,
    step: 15 * MS_IN_HOURS,
    unit: 'h',
  },
  {
    duration: 30 * MS_IN_HOURS,
    step: 10 * MS_IN_HOURS,
    unit: 'h',
  },
  {
    duration: 15 * MS_IN_HOURS,
    step: 5 * MS_IN_HOURS,
    unit: 'h',
  },
  {
    duration: 12 * MS_IN_HOURS,
    step: 3 * MS_IN_HOURS,
    unit: 'h',
  },
  {
    duration: 6 * MS_IN_HOURS,
    step: 2 * MS_IN_HOURS,
    unit: 'h',
  },
  {
    duration: 3 * MS_IN_HOURS,
    step: 1 * MS_IN_HOURS,
    unit: 'h',
  },
  {
    duration: 1 * MS_IN_HOURS,
    step: 20 * MS_IN_MINUTES,
    unit: 'm',
  },
  // duration < 1 hour
  {
    duration: 45 * MS_IN_MINUTES,
    step: 15 * MS_IN_MINUTES,
    unit: 'm',
  },
  {
    duration: 30 * MS_IN_MINUTES,
    step: 10 * MS_IN_MINUTES,
    unit: 'm',
  },
  {
    duration: 15 * MS_IN_MINUTES,
    step: 5 * MS_IN_MINUTES,
    unit: 'm',
  },
  {
    duration: 12 * MS_IN_MINUTES,
    step: 3 * MS_IN_MINUTES,
    unit: 'm',
  },
  {
    duration: 6 * MS_IN_MINUTES,
    step: 2 * MS_IN_MINUTES,
    unit: 'm',
  },
  {
    duration: 3 * MS_IN_MINUTES,
    step: 1 * MS_IN_MINUTES,
    unit: 'm',
  },
  {
    duration: 1 * MS_IN_MINUTES,
    step: 20 * MS_IN_SECONDS,
    unit: 's',
  },
  // duration < 1m
  {
    duration: 45 * MS_IN_SECONDS,
    step: 15 * MS_IN_SECONDS,
    unit: 's',
  },
  {
    duration: 30 * MS_IN_SECONDS,
    step: 10 * MS_IN_SECONDS,
    unit: 's',
  },
  {
    duration: 15 * MS_IN_SECONDS,
    step: 5 * MS_IN_SECONDS,
    unit: 's',
  },
  {
    duration: 12 * MS_IN_SECONDS,
    step: 3 * MS_IN_SECONDS,
    unit: 's',
  },
  {
    duration: 6 * MS_IN_SECONDS,
    step: 2 * MS_IN_SECONDS,
    unit: 's',
  },
  {
    duration: 3 * MS_IN_SECONDS,
    step: 1 * MS_IN_SECONDS,
    unit: 's',
  },
  {
    duration: 1 * MS_IN_SECONDS,
    step: 200,
    unit: 'ms',
  },
];

function testsToRunHistorySlice(testsToRunHistory: TestsToRunSummary[], slice: number, visibleBarsCount: number) {
  return testsToRunHistory.slice(testsToRunHistory.length - slice, slice
    ? testsToRunHistory.length + visibleBarsCount - slice
    : testsToRunHistory.length);
}

// TODO move that
function getTimeFormat(durationMs: number, unit: string) {
  switch (unit) {
    case 'h':
      return durationMs / 3600000;
    case 'm':
      return durationMs / 60000;
    case 's':
      return durationMs / 1000;
    default:
      return durationMs;
  }
}

function getYScale(duration: number) {
  const params = getParams(duration);
  const count = Math.ceil(duration / params.step);
  return {
    stepSizeMs: params.step,
    unit: params.unit,
    stepsCount: count,
  };
}

function getParams(duration: number) {
  const durationsMs = graphParams.map(x => x.duration);

  const lesserNeighborIndex = durationsMs.findIndex(x => x <= duration);

  const isOutOfRange = lesserNeighborIndex === -1;
  if (isOutOfRange) {
    const isLessThanRange = duration <= durationsMs[durationsMs.length - 1];
    if (isLessThanRange) {
      return graphParams[graphParams.length - 1];
    }
    return graphParams[0];
  }

  const exactGt = lesserNeighborIndex === durationsMs.length - 1;
  if (exactGt) {
    return graphParams[graphParams.length - 1];
  }

  const exactLt = lesserNeighborIndex === 0;
  if (exactLt) {
    return graphParams[0];
  }

  const lesserError = Math.abs(durationsMs[lesserNeighborIndex] - duration);
  const greaterError = Math.abs(durationsMs[lesserNeighborIndex - 1] - duration);

  const bestNeighborIndex = lesserError < greaterError
    ? lesserNeighborIndex
    : lesserNeighborIndex - 1;

  const step = graphParams[bestNeighborIndex];

  return step;
}
