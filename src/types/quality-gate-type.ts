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
import { Metrics } from './metrics';

export type QualityGateStatus = 'PASSED' | 'FAILED';

export interface QualityGateCondition {
  value: string;
  measure: 'coverage' | 'risks' | 'tests';
  operator: 'LT' | 'GT' | 'LTE' | 'GTE';
}

export interface ConditionSetting {
  type: 'condition';
  enabled: boolean;
  condition: QualityGateCondition;
}

export interface ConditionSettingByType {
  coverage: ConditionSetting;
  risks: ConditionSetting;
  tests: ConditionSetting;
  [key: string]: ConditionSetting;
}

export interface Results {
  coverage: boolean;
  risks: boolean;
  tests: boolean;
}

export interface QualityGate {
  status: QualityGateStatus;
  results: Results;
}

export interface QualityGateSettings {
  configured: boolean;
  conditionSettingByType: ConditionSettingByType;
  qualityGate: QualityGate;
  metrics?: Metrics;
}
