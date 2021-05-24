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
import { snakeToSpaces } from './snake-to-spaces';

describe('snakeToSpaces', () => {
  it('should transform provided snakeCase to spaces', () => {
    expect(snakeToSpaces('foo_bar')).toBe('foo bar');
  });

  it('should return a same and trim string if the value is not a snakeCase', () => {
    expect(snakeToSpaces('foo')).toBe('foo');
    expect(snakeToSpaces(' foo')).toBe('foo');
    expect(snakeToSpaces('foo ')).toBe('foo');
  });

  it('should return trimmed string after transformation', () => {
    expect(snakeToSpaces('foo ')).toBe('foo');
    expect(snakeToSpaces(' foo')).toBe('foo');
    expect(snakeToSpaces('foo_bar ')).toBe('foo bar');
    expect(snakeToSpaces(' foo_bar')).toBe('foo bar');
  });

  it('should return empty string if value is empty string', () => {
    expect(snakeToSpaces('')).toBe('');
  });
});
