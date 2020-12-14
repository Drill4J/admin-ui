import { TestTypes } from './test-types';

interface TestsToRunStats {
  total?: number;
  completed?: number;
  duration?: number;
  parentDuration?: number;
}

export interface TestsToRunSummary {
  buildVersion?: string;
  stats?: TestsToRunStats;
  statsByType?: Record<TestTypes, TestsToRunStats>;
}
