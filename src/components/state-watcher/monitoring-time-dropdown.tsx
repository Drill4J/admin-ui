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
import { Dispatch, SetStateAction } from 'react';
import { Inputs } from '@drill4j/ui-kit';
// import tw, { styled } from 'twin.macro';

interface Props {
  timeStamp: number;
  setTimeStamp: Dispatch<SetStateAction<number>>
}

export const MonitoringTimeDropdown = ({ timeStamp, setTimeStamp }: Props) => (
  <Inputs.Dropdown
    items={[
      {
        label: 'Last minute', value: 60000,
      },
      {
        label: 'Last 2 minutes', value: 120000,
      },
      {
        label: 'Last 3 minutes', value: 180000,
      },
      {
        label: 'Last 4 minutes', value: 240000,
      },
      {
        label: 'Last 5 minutes', value: 300000,
      },
      {
        label: 'Last 10 minutes', value: 600000,
      },
      {
        label: 'Last 30 minutes', value: 1800000,
      },
      {
        label: 'Last 1 hour', value: 3600000,
      },
      {
        label: 'Last 4 hours', value: 14400000,
      },
      {
        label: 'Last 8 hours', value: 28800000,
      },
      {
        label: 'Last 12 hours', value: 86400000,
      },
    ]}
    onChange={({ value }) => setTimeStamp(Number(value))}
    value={timeStamp}
  />
);
