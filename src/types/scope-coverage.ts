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
import { RisksSummary } from './risks-summary';
import { TestTypeSummary } from './test-type-summary';
import { Count } from './count';

interface Overlap {
  percentage?: number;
  count?: Count;
  methodCount?: Count;
}

export interface ScopeCoverage {
  percentage?: number;
  overlap?: Overlap;
  risks?: RisksSummary;
  byTestType?: TestTypeSummary[];
  methodCount?: Count;
  count?: Count;
  riskCount?: Count;
  packageCount?: Count;
  classCount?: Count;
}
