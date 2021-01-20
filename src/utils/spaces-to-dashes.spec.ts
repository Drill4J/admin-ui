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
import { spacesToDashes } from './spaces-to-dashes';

describe('spacesToDashes', () => {
  it('should trim the string before transormation', () => {
    expect(spacesToDashes('   foobarbuzz   ')).toBe('foobarbuzz');
  })

  it('should convert the string to lowercase before transormation', () => {
    expect(spacesToDashes('   FooBARbuzZ   ')).toBe('foobarbuzz');
  })

  it('should replace spaces with a dash in a provided string', () => {
    expect(spacesToDashes('foo bar buzz')).toBe('foo-bar-buzz');
  });
});
