import { CoverageByType } from './coverage-by-type';
import { RisksSummary } from './risks-summary';

interface Count {
  covered?: number;
  total?: number;
}

export interface BuildCoverage {
  ratio?: number;
  methodCount?: Count;
  riskCount?: Count;
  byTestType?: CoverageByType;
  uncoveredMethodsCount?: number;
  classesCount?: number;
  arrow?: 'INCREASE' | 'DECREASE';
  diff?: number;
  prevBuildVersion?: string;
  finishedScopesCount?: number;
  risks?: RisksSummary;
}
