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
import { camelToSpaces } from './camel-to-spaces';

describe('camelToSpaces', () => {
  it('should transform provided camelCase string to spaces', () => {
    expect(camelToSpaces('fooBarBuzz')).toBe('foo bar buzz');
    expect(camelToSpaces('foo')).toBe('foo');
  });

  it('should trim string after transormation', () => {
    expect(camelToSpaces('fooBarBuzz   ')).toBe('foo bar buzz');
    expect(camelToSpaces('foo ')).toBe('foo');
  });

  it('should return empty string if empty string privoded', () => {
    expect(camelToSpaces('')).toBe('');
  });
});
