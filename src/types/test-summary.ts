import { Coverage } from './coverage';

export interface TestSummary {
  coverage?: Coverage;
  testCount?: number;
  duration?: number;
}
