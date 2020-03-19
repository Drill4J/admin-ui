import { TestTypeSummary } from './test-type-summary';

interface ScopeCoverage {
  ratio: number;
  methodCount: number;
  riskCount: number;
  coverageByType: { [key: string]: TestTypeSummary };
}

export interface ScopeSummary {
  name: string;
  id: string;
  started: number;
  finished: number;
  coverage: ScopeCoverage;
  enabled: boolean;
  active: boolean;
  [key: string]: string | number | boolean | { [key: string]: TestTypeSummary } | ScopeCoverage;
}
