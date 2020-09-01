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
  methodCount?: Count;
  riskCount?: Count;
  overlap?: Overlap;
  count?: Count;
  risks?: RisksSummary;
  byTestType?: TestTypeSummary[];
}
