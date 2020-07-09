import { Metrics } from './metrics';

export type QualityGateStatus = 'PASSED' | 'FAILED';

export interface QualityGateCondition {
  measure: 'coverage' | 'risks' | 'tests';
  operator: 'LT' | 'GT' | 'LTE' | 'GTE';
  value: number;
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
