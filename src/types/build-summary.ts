import { Count } from './count';
import { RisksSummary } from './risks-summary';
import { TestCount } from './test-count';
import { TestTypeSummary } from './test-type-summary';

export interface BuildSummary {
  coverage?: number;
  coverageCount?: Count;
  scopeCount?: number;
  riskCounts?: RisksSummary;
  tests?: TestTypeSummary[];
  testsToRun?: TestCount;
  recommendations?: string[];
  testDuration?: number;
}
