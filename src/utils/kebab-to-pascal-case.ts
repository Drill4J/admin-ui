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

export function kebabToPascalCase(str?: string): string {
  if (str === null || str === undefined || str === '') {
    return '';
  }
  if (typeof str !== 'string') {
    return kebabToPascalCase(String(str));
  }
  if (str.indexOf('-') === -1) {
    // Not a kebab-case
    return clean(str);
  }
  const arr = (str.match(/[^-]+/g) || []).map(clean);
  return arr.map(capitalize).join('');
}

function clean(str: string): string {
  return str.replace(/^\W+/, '').replace(/\W+$/, '');
}
