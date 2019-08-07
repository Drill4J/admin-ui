import { TestTypeSummary } from './test-type-summary';

export interface CoverageByType {
  [testType: string]: TestTypeSummary;
}
