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
import { removeUnnecessarySpaces } from './remove-unnecessary-spaces';

describe('removeUnnecessarySpaces', () => {
  it('should trim the string', () => {
    expect(removeUnnecessarySpaces('   foobarbuzz   ')).toBe('foobarbuzz');
  })

  it('should trim the string and leave only one space between the words', () => {
    expect(removeUnnecessarySpaces('   foo    bar foo   ')).toBe('foo bar foo');
    expect(removeUnnecessarySpaces(' foo bar buzz ')).toBe('foo bar buzz');
  })
});
