import { Count } from './count';
import { RisksSummary } from './risks-summary';
import { TestCount } from './test-count';

export interface BuildSummary {
  coverage?: number;
  coverageCount?: Count;
  scopeCount?: number;
  riskCounts?: RisksSummary;
  tests?: TestCount;
  testsToRun?: TestCount;
  recommendations?: string[];
}