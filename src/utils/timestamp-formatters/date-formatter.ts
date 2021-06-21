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
const MAX_TIMESTAMP = 8640000000000000;

export function dateFormatter(timestamp?: number) {
  if (typeof timestamp === 'number' && timestamp >= 0 && timestamp < MAX_TIMESTAMP) {
    const date = new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });
    return date;
  }
  return '';
}
