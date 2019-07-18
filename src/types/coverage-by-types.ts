import { TestTypeSummary } from './test-type-summary';

export interface CoverageByTypes {
  [testType: string]: TestTypeSummary;
}
