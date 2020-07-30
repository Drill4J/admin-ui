import { ScopeCoverage } from './scope-coverage';

export interface ScopeSummary {
  name: string;
  id: string;
  started: number;
  finished: number;
  enabled: boolean;
  active: boolean;
  coverage: ScopeCoverage;
  [key: string]: string | number | boolean | ScopeCoverage;
}
