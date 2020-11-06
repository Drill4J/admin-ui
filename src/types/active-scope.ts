import { ScopeCoverage } from './scope-coverage';

export interface ActiveScope {
  name: string;
  id: string;
  started: number;
  finished: number;
  enabled: boolean;
  active: boolean;
  coverage: ScopeCoverage;
  sessionsFinished: number;
  [key: string]: string | number | boolean | ScopeCoverage;
}
