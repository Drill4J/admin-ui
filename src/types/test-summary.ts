import { Count } from './count';

interface Coverage {
  percentage?: number;
  methodCount?: Count;
  count?: Count;
}

export interface TestSummary {
  coverage?: Coverage;
  testCount?: number;
}
