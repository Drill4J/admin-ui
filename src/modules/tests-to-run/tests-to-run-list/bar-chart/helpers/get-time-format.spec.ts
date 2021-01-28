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
import { getTimeFormat } from './get-time-format';

describe('getTimeFormat', () => {
  it('should return the count of seconds out of milliseconds', () => {
    expect(getTimeFormat(3600000, 's')).toEqual(3600);
  });

  it('should return the count of minutes out of milliseconds', () => {
    expect(getTimeFormat(3600000, 'm')).toEqual(60);
  });

  it('should return the count of hours out of milliseconds', () => {
    expect(getTimeFormat(3600000, 'h')).toEqual(1);
  });

  it('should return the count of hours out of milliseconds', () => {
    expect(getTimeFormat(NaN, 'h')).toEqual(0);
  });

  it('should return the count of hours out of milliseconds', () => {
    expect(getTimeFormat(Infinity, 'h')).toEqual(0);
  });
});
