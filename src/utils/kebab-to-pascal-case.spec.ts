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
import { kebabToPascalCase } from './kebab-to-pascal-case';

describe('kebabToPascalCase', () => {
  it('should transform provided kebabCase to PascalCase', () => {
    expect(kebabToPascalCase('foo-bar')).toBe('FooBar');
  });

  it('should return a same and trim string if the value is not a kebabCase', () => {
    expect(kebabToPascalCase('foo')).toBe('foo');
    expect(kebabToPascalCase(' foo')).toBe('foo');
    expect(kebabToPascalCase('foo ')).toBe('foo');
  });

  it('should return trimmed string after transformation', () => {
    expect(kebabToPascalCase('foo ')).toBe('foo');
    expect(kebabToPascalCase(' foo')).toBe('foo');
    expect(kebabToPascalCase('foo-bar ')).toBe('FooBar');
    expect(kebabToPascalCase(' foo-bar')).toBe('FooBar');
  });

  it('should return empty string if value is empty string', () => {
    expect(kebabToPascalCase('')).toBe('');
  });
});
