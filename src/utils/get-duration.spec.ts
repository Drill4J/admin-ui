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
import { getDuration } from './get-duration';

describe('getDuration', () => {
  it('should return object with the seconds, minutes, hours properties is equal 00 and isLessThenOneSecond is equal false if value is NaN', () => {
    expect(getDuration(NaN)).toEqual({
      seconds: '00',
      minutes: '00',
      hours: '00',
      isLessThenOneSecond: false,
    });
  });

  it('should return object with the seconds, minutes, hours properties is equal 00 and isLessThenOneSecond is equal false if value is Infinity', () => {
    expect(getDuration(Infinity)).toEqual({
      seconds: '00',
      minutes: '00',
      hours: '00',
      isLessThenOneSecond: false,
    });
  });

  it('should return object with the seconds, minutes, hours properties is equal 00 and isLessThenOneSecond is equal false if value is 0', () => {
    expect(getDuration(0)).toEqual({
      seconds: '00',
      minutes: '00',
      hours: '00',
      isLessThenOneSecond: false,
    });
  });

  it('should return object with the seconds, minutes, hours properties is equal 01 and isLessThenOneSecond is equal false if value is 3661001', () => {
    expect(getDuration(3661001)).toEqual({
      seconds: '01',
      minutes: '01',
      hours: '01',
      isLessThenOneSecond: false,
    });
  });

  it('should return object with the hours is equal 25 with value is 3600000 * 25', () => {
    expect(getDuration(3600000 * 25)).toEqual({
      seconds: '00',
      minutes: '00',
      hours: '25',
      isLessThenOneSecond: false,
    });
  });

  it('should return object with isLessThenOneSecond property is equal true if value is 123', () => {
    expect(getDuration(123).isLessThenOneSecond).toBe(true);
  });
});
