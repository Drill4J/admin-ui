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
import { parsePackages } from './parse-packages';

describe('parsePackages', () => {
  it('should transform to an array containing strings without spaces', () => {
    expect(parsePackages('foo bar   buzz   bizz  ')).toStrictEqual(['foobarbuzzbizz']);
    expect(parsePackages('                       ')).toStrictEqual(['']);
    expect(parsePackages('')).toStrictEqual(['']);
  });
});
