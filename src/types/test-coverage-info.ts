import { Coverage } from './coverage';
import { TestStats } from './test-stats';

export interface TestCoverageInfo {
  id: string;
  type: string;
  name: string;
  toRun: boolean;
  coverage: Coverage;
  stats: TestStats;
  [key: string]: string | boolean | Coverage | TestStats;
}
