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
import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should transform provided uppercase string to capitalize', () => {
    expect(capitalize('FOO')).toBe('Foo');
  });

  it('should transform provided lowercase string to capitalize', () => {
    expect(capitalize('foo')).toBe('Foo');
  });

  it('should return empty string if provide value is empty string', () => {
    expect(capitalize('')).toBe('');
  });
});
