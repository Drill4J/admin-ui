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
export const getDuration = (value: number): { hours: string, minutes: string, seconds: string, isLessThenOneSecond: boolean } => {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return {
      hours: '00', minutes: '00', seconds: '00', isLessThenOneSecond: false,
    };
  }

  const seconds = Math.round(value / 1000) % 60;
  const minutes = Math.round((value - seconds * 1000) / 60000) % 60;
  const hours = Math.round((value - minutes * 60000 - seconds * 1000) / 3600000);
  const isLessThenOneSecond = value > 0 && value < 1000;

  return {
    hours: `0${hours}`.slice(-2),
    minutes: `0${minutes}`.slice(-2),
    seconds: `0${seconds}`.slice(-2),
    isLessThenOneSecond,
  };
};
