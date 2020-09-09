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
  isEditing: boolean;
  coverage: ConditionSetting;
  risks: ConditionSetting;
  tests: ConditionSetting;
  [key: string]: boolean | ConditionSetting;
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
