import { TestTypeSummary } from './test-type-summary';

export interface ScopeSummary {
  name: string;
  id: string;
  started: number;
  finished: number;
  coverage: number;
  enabled: boolean;
  coveragesByType: { [key: string]: TestTypeSummary };
}
