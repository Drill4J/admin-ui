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
import { getParams } from './get-params';

type Unit = 'h' | 'm' | 's';

export function getYScale(duration: number) {
  const params = getParams(duration);
  const count = Math.ceil(duration / params.step);
  if (Number.isNaN(duration) || !Number.isFinite(duration)) {
    return {
      stepSizeMs: 1000,
      unit: 's' as Unit,
      stepsCount: 6,
    };
  }
  return {
    stepSizeMs: params.step,
    unit: params.unit as Unit,
    stepsCount: count,
  };
}
