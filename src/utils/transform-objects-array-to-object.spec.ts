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
import { transformObjectsArrayToObject } from './transform-objects-array-to-object';

describe('transformObjectsArrayToObject', () => {
  const testArray = [
    {id: '1', type: 'foo', name: 'fooName', array: ['f', 'o', 'o'] },
    {id: '2', type: 'bar', name: 'barName', array: ['b', 'a', 'r'] },
  ];

  it('should convert an array of objects to a single object by id', () => {
    expect(transformObjectsArrayToObject(testArray, 'id')).toStrictEqual({
      1: {id: '1', type: 'foo', name: 'fooName', array: ['f', 'o', 'o'] },
      2: {id: '2', type: 'bar', name: 'barName', array: ['b', 'a', 'r'] },
    });
  });

  it('should convert an array of objects to a single object by type', () => {
    expect(transformObjectsArrayToObject(testArray, 'type')).toStrictEqual({
      foo: {id: '1', type: 'foo', name: 'fooName', array: ['f', 'o', 'o'] },
      bar: {id: '2', type: 'bar', name: 'barName', array: ['b', 'a', 'r'] },
    });
  });

  it('should convert an array of objects to a single object by name', () => {
    expect(transformObjectsArrayToObject(testArray, 'name')).toStrictEqual({
      fooName: {id: '1', type: 'foo', name: 'fooName', array: ['f', 'o', 'o'] },
      barName: {id: '2', type: 'bar', name: 'barName', array: ['b', 'a', 'r'] },
    });
  });
});
