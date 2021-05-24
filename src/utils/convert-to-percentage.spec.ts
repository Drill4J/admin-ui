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
import { convertToPercentage } from './convert-to-percentage';

describe('convertToPercentage', () => {
  it('should return zero if denominator is 0', () => {
    expect(convertToPercentage(100, 0)).toBe(0);
  });

  it('should return 0 if denominator is NaN', () => {
    expect(convertToPercentage(100, NaN)).toBe(0);
  });

  it('should return 0 if numerator is NaN', () => {
    expect(convertToPercentage(NaN, 100)).toBe(0);
  });

  it('should return 0 if denominator is -0 ', () => {
    expect(convertToPercentage(100, -0)).toEqual(0);
  });

  it('should return 0 if numerator and denominator is NaN', () => {
    expect(convertToPercentage(NaN, NaN)).toBe(0);
  });

  it('should return 0 denominator is Infinity', () => {
    expect(convertToPercentage(100, Infinity)).toBe(0);
  });

  it('should return 0 numerator is Infinity', () => {
    expect(convertToPercentage(Infinity, 100)).toBe(0);
  });
});
