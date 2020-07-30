import { RisksSummary } from './risks-summary';
import { TestTypeSummary } from './test-type-summary';
import { Count } from './count';

interface Overlap {
  percentage?: number;
  count?: Count;
}

export interface ScopeCoverage {
  ratio?: number;
  methodCount?: Count;
  riskCount?: Count;
  overlap?: Overlap;
  count?: Count;
  risks?: RisksSummary;
  byTestType?: TestTypeSummary[];
}
