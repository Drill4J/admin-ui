import { useEffect, useRef, useState } from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Panel, Tooltip } from '@drill4j/ui-kit';
import { nanoid } from 'nanoid';

import { DATA_VISUALIZATION_COLORS } from 'common/constants';
import { useBuildVersion, useElementSize } from 'hooks';
import { TestsToRunSummary } from 'types/tests-to-run-summary';
import { getDuration, percentFormatter } from 'utils';

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
const BORDER_PX = 1;

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
            const durationHeight = Math.max(msPerPx * duration - BORDER_PX, MIN_DURATION_HEIGHT_PX);

            const savedTimeMs = totalDuration - duration;
            const savedTimeHeight = msPerPx * savedTimeMs - (durationHeight > 4 ? 0 : MIN_DURATION_HEIGHT_PX);

            const { hours, minutes, seconds } = getDuration(duration);
            const savedTimeDuration = getDuration(totalDuration - duration);

            return (
              <GroupedBars bordered={!isAllAutoTestsDone} hasUncompletedTests={completed > 0 && completed < total} key={nanoid()}>
                <Tooltip message={(
                  <>
                    {!total && 'No Auto Tests suggested to run in this build'}
                    {isAllAutoTestsDone && (
                      <SavedTimePercent>
                        Total time saved: {savedTimeDuration.hours}:{savedTimeDuration.minutes}:{savedTimeDuration.seconds}
                        <span>{percentFormatter((1 - duration / totalDuration) * 100)}%</span>
                      </SavedTimePercent>
                    )}
                    {Boolean(total) && !isAllAutoTestsDone && (
                      <Panel direction="column">
                        <span>{`${completed ? 'Not all' : 'None'} of the suggested Auto Tests`}</span>
                        <span>were run in this build</span>
                      </Panel>
                    )}
                  </>
                )}
                >
                  <Bar
                    type={buildVersion !== activeBuildVersion ? 'saved-time' : undefined}
                    style={{
                      height: `${savedTimeHeight}px`,
                      backgroundColor: isAllAutoTestsDone ? DATA_VISUALIZATION_COLORS.SAVED_TIME : 'transparent',
                    }}
                  />
                </Tooltip>
                {buildVersion !== activeBuildVersion ? (
                  <Tooltip message={`Auto Tests duration with Drill4J: ${hours}:${minutes}:${seconds}`}>
                    <Bar type="duration" style={{ height: `${durationHeight}px` }} />
                  </Tooltip>
                ) : (
                  <Tooltip message={`Auto Tests current duration with Drill4J: ${hours}:${minutes}:${seconds}`}>
                    <Bar type="active" style={{ height: `${durationHeight}px` }} />
                  </Tooltip>
                )}
              </GroupedBars>
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
