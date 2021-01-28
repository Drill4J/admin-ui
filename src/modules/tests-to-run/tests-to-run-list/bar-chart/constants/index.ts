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
export const BAR_HORIZONTAL_PADDING_PX = 96;
export const BAR_WITH_GAP_WIDTH_PX = 112;
export const CHART_HEIGHT_PX = 160;
export const BORDER_PX = 1;

export const MS_IN_SECONDS = 1000;
export const MS_IN_MINUTES = MS_IN_SECONDS * 60;
export const MS_IN_HOURS = MS_IN_MINUTES * 60;

export const graphParams = [
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
