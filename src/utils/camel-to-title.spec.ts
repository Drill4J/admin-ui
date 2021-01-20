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
import { camelToTitle } from './camel-to-title';

describe('camelToTitle', () => {
  it('should transform provided camelCase string to title', () => {
    expect(camelToTitle('fooBarBuzz')).toBe('Foo Bar Buzz');
    expect(camelToTitle('foo')).toBe('Foo');
  });

  it('should trim string after transormation', () => {
    expect(camelToTitle('fooBarBuzz   ')).toBe('Foo Bar Buzz');
    expect(camelToTitle('foo ')).toBe('Foo');
  });

  it('should return empty string if empty string privoded', () => {
    expect(camelToTitle('')).toBe('');
  });
});
