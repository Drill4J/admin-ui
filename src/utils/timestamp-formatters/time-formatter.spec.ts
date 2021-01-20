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
import { timeFormatter } from './time-formatter';	

describe('timeFormatter', () => {	
  it('Should return an empty string if the number does not fall within the interval from 0 to MAX_TIMESTAMP', () => {	
    expect(timeFormatter(8640000000000000 + 1000)).toBe('');	
    expect(timeFormatter(-123230)).toBe('');
  })

  it('Should return an empty string if not a number provided', () => {	
    expect(timeFormatter(undefined)).toBe('');	
    expect(timeFormatter(NaN)).toBe('');	
    expect(timeFormatter(Infinity)).toBe('');
  });	
});
