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

describe('getParams', () => {
  it('should return the parameters for the correct calculation', () => {
    expect(getParams(3600000)).toEqual({ duration: 3600000, step: 1200000, unit: "m" });
  });

  it('should return the parameters for the correct calculation', () => {
    expect(getParams(NaN)).toEqual({
      duration: 360000000,
      step: 90000000,
      unit: 'h',
    });
  });

  it('should return the parameters for the correct calculation', () => {
    expect(getParams(Infinity)).toEqual({
      duration: 360000000,
      step: 90000000,
      unit: 'h',
    });
  });
});
