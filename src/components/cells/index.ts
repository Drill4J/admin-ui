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
import { DurationCell } from './duration-cell';
import { CompoundCell } from './compound-cell';
import { CoverageCell } from './coverage-cell';
import { ClickableCell } from './clickable-cell';
import { TestStatusCell } from './test-status-cell';

export const Cells = {
  Duration: DurationCell,
  Compound: CompoundCell,
  Clickable: ClickableCell,
  Coverage: CoverageCell,
  TestStatus: TestStatusCell,
};
