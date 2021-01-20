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
import { formatMsToDate } from './format-ms-to-date';

describe('formatMsToDate', () => {
  it('should return an object with properties is equal to 0 if value is 1', () => {
    expect(formatMsToDate(1)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it('should return an object with properties is equal to 0 if value is NaN', () => {
    expect(formatMsToDate(NaN)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it('should return an object with properties is equal to 0 if value is Infinity', () => {
    expect(formatMsToDate(Infinity)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it('should return an object with properties is equal to 1 if value is 90061000', () => {
    expect(formatMsToDate(90061000)).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1 });
  });
});
