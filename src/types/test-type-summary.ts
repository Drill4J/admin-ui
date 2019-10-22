import { TestTypes } from './test-types';

export interface TestTypeSummary {
  testType: TestTypes;
  coverage: number;
  testCount: number;
}
