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
import { useState } from 'react';
import { Checkbox, Icons } from '@drill4j/ui-kit';
import {
  CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, ReferenceLine,
} from 'recharts';
import tw, { styled } from 'twin.macro';

import { Stub } from 'components';
import { formatBytes, lessThanTen } from 'utils';
import { StateWatcherData } from 'types/state-watcher';
import { useInstanceIds } from 'hooks';
import { StateWatcherTooltip } from './state-watcher-tooltip';

interface Props {
  data: StateWatcherData;
  instanceIds: string[];
  isActiveBuildVersion: boolean;
  height: number;
}

export const StateWatcher = ({
  data, instanceIds, isActiveBuildVersion, height,
}: Props) => {
  const [totalHeapLineIsVisible, setTotalHeapLineIsVisible] = useState(true);
  const { observableInstances, toggleInstanceActiveStatus } = useInstanceIds(instanceIds);

  return isActiveBuildVersion ? (
    <>
      <div tw="flex justify-between py-6">
        <span tw="text-12 leading-16 text-monochrome-default font-bold uppercase">Memory usage</span>
      </div>
      <div tw="flex justify-between gap-x-6 pl-4">
        <ResponsiveContainer height={height}>
          <LineChart height={height}>
            <CartesianGrid strokeDasharray="line" strokeWidth={1} stroke="#E3E6E8" />
            <XAxis
              dataKey="timeStamp"
              type="number"
              scale="time"
              strokeWidth="1"
              stroke="#1B191B"
              shapeRendering="crispEdges"
              domain={['dataMin', 'dataMax']}
              interval={defineInterval(data?.series[0]?.data?.length || 0)}
              tick={({ x, y, payload }) => {
                const date = new Date(payload.value);

                const tick = `${lessThanTen(date.getHours())}:${lessThanTen(date.getMinutes())}:${lessThanTen(date.getSeconds())}`;
                return (
                  <Tick x={x} y={y} dy={16} dx={-25}>{tick}</Tick>
                );
              }}
            />
            {data.brakes.map((timeStamp) => <ReferenceLine x={timeStamp} stroke="#687481" strokeDasharray="7 4" label={PauseIcon} />)}
            <YAxis
              domain={[0, data.maxHeap + data.maxHeap * 0.15]}
              dataKey="memory.heap"
              tick={({ x, y, payload }) => (
                <Tick
                  isLast={payload.value === data.maxHeap + data.maxHeap * 0.15}
                  x={x}
                  y={y}
                  dy={5}
                  dx={-56}
                >
                  {formatBytes(payload.value)}
                </Tick>
              )}
              strokeWidth={0}
            />
            {totalHeapLineIsVisible && <ReferenceLine y={data.maxHeap} stroke="#F7D77C" strokeWidth={2} />}
            {/* below is a hack to match the design */}
            {totalHeapLineIsVisible && (
              <ReferenceLine
                y={data.maxHeap - data.maxHeap / 128}
                stroke="#F7D77C"
                opacity="0.2"
                strokeWidth={6}
              />
            )}
            <Tooltip content={({ payload, label }) => <StateWatcherTooltip payload={payload} label={label} maxHeap={data?.maxHeap} />} />
            {data.series.map((instance) => (
              observableInstances.find(({ instanceId }) => instance.instanceId === instanceId)?.isActive && (
                <Line
                  data={instance.data}
                  key={instance.instanceId}
                  type="linear"
                  dataKey="memory.heap"
                  stroke={observableInstances.find(({ instanceId }) => instance.instanceId === instanceId)?.color}
                  dot={false}
                  isAnimationActive={false}
                  strokeWidth={2}
                  name={instance.instanceId}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div tw="space-y-1 pt-1 w-52">
          <Checkbox
            color="#F7D77C"
            checked={totalHeapLineIsVisible}
            onChange={() => setTotalHeapLineIsVisible(!totalHeapLineIsVisible)}
            label={<Label>Total {formatBytes(data.maxHeap)}</Label>}
          />
          <span tw="text-10 leading-24 text-monochrome-default">Instances:</span>
          <ScrollContainer>
            {observableInstances.map(({ instanceId, color, isActive }) => (
              <div tw="flex gap-x-2">
                <Checkbox
                  color={color}
                  checked={isActive}
                  onChange={() => toggleInstanceActiveStatus(instanceId)}
                />
                <Label title={instanceId}>{instanceId}</Label>
              </div>
            ))}
          </ScrollContainer>
        </div>
      </div>
    </>
  ) : (
    <Stub
      icon={<Icons.Data width={120} height={120} />}
      title="No data available"
      message="Memory usage information can only be displayed for the last build"
    />
  );
};

const ScrollContainer = styled.div`
  ${tw`h-28 space-y-2 overflow-auto`};
    &::-webkit-scrollbar {
      ${tw`w-1 rounded bg-monochrome-light-tint`}
    };

    &::-webkit-scrollbar-thumb {
      ${tw`w-1 rounded bg-monochrome-medium-tint`}
    };
`;

interface TickProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  isLast?: boolean;
  children: React.ReactNode;
}

const Tick = ({
  x, y, dx, dy, isLast, children,
}: TickProps) => (
  <g>
    <text x={x + 42} y={isLast ? y - 8 : y} dy={dy} dx={dx} fill="#687481" tw="text-12 leading-16 text-right" textAnchor="end">
      {children}
    </text>
  </g>
);

const PauseIcon = ({ viewBox }: any) => (
  <g className="group">
    <rect x={viewBox.x - 96} y="-54" width="188" height="28" fill="#1B191B" rx="4" ry="4" tw="invisible group-hover:visible" />
    <text x={viewBox.x - 80} y="-36" fill="#fff" tw="text-12 leading-16 invisible group-hover:visible">
      The Monitoring was paused
    </text>
    <svg
      tw="text-monochrome-black h-2 w-full left-0 invisible group-hover:visible"
      x={viewBox.x - 13}
      y="-30px"
    >
      <polygon tw="fill-current" points="0,0 13,13 26,0" />
    </svg>
    <g
      transform="translate(-3 -2)"
      stroke="#687481"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <rect x={viewBox.x - 2} y="-10" width="3" height="11" rx=".5" />
      <rect x={viewBox.x} y="-10" width="20" height="12" rx=".5" tw="" fill="#fff" opacity="0" />
      <rect x={viewBox.x + 5} y="-10" width="3" height="11" rx=".5" />
    </g>
  </g>
);

const Label = styled.span`
  ${tw`text-12 leading-16 text-monochrome-default text-ellipsis`}
`;

function defineInterval(dataLength: number) {
  if (dataLength < 24) return 0;
  return Math.ceil(dataLength / 24);
}
