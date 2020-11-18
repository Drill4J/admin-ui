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
