import { TestTypeSummary } from './test-type-summary';

interface Coverage {
  ratio?: number;
  methodCount?: number;
  riskCount?: number;
  byTestType?: { [key: string]: TestTypeSummary };
}

export interface ActiveScope {
  name: string;
  id: string;
  started: number;
  finished: number;
  enabled: boolean;
  active: boolean;
  coverage: Coverage;
  [key: string]: string | number | boolean | { [key: string]: TestTypeSummary } | Coverage;
}
