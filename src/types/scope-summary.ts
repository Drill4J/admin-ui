import { TestTypeSummary } from './test-type-summary';

export interface ScopeSummary {
  name: string;
  id: string;
  started: number;
  finished: number;
  ratio: number;
  methodCount: number;
  riskCount: number;
  byTestType: { [key: string]: TestTypeSummary };
  enabled: boolean;
  active: boolean;
  [key: string]: string | number | boolean | { [key: string]: TestTypeSummary };
}
