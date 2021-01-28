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
import { getYScale } from './get-y-scale';

describe('getYScale', () => {
  it('should return the step size in milliseconds, unit, and number of steps', () => {
    expect(getYScale(3600000)).toEqual({ stepSizeMs: 1200000, stepsCount: 3, unit: "m" });
  });

  it('should return the prepared object for correct display in case of bad values', () => {
    expect(getYScale(NaN)).toEqual({
      stepSizeMs: 1000,
      unit: 's',
      stepsCount: 6,
    });
  });

  it('should return the prepared object for correct display in case of bad values', () => {
    expect(getYScale(Infinity)).toEqual({
      stepSizeMs: 1000,
      unit: 's',
      stepsCount: 6,
    });
  });
});
