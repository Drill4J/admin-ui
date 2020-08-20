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
