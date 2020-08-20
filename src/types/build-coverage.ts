import { RisksSummary } from './risks-summary';
import { TestTypeSummary } from './test-type-summary';

interface Count {
  covered?: number;
  total?: number;
}

export interface BuildCoverage {
  percentage?: number;
  count?: Count;
  methodCount?: Count;
  riskCount?: Count;
  byTestType?: TestTypeSummary[];
  uncoveredMethodsCount?: number;
  arrow?: 'INCREASE' | 'DECREASE';
  diff?: number;
  prevBuildVersion?: string;
  finishedScopesCount?: number;
  risks?: RisksSummary;
}
