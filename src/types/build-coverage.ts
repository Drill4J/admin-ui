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
import { Count } from './count';
import { RisksSummary } from './risks-summary';
import { TestTypeOverlap } from './test-type-overlap';
import { TestTypeSummary } from './test-type-summary';

export interface BuildCoverage {
  percentage?: number;
  byTestType?: TestTypeSummary[];
  uncoveredMethodsCount?: number;
  finishedScopesCount?: number;
  risks?: RisksSummary;
  count?: Count;
  riskCount?: Count;
  classCount?: Count;
  methodCount?: Count;
  packageCount?: Count;
  testTypeOverlap?: TestTypeOverlap;
}
