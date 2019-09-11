export interface TestTypeSummary {
  testType: 'MANUAL' | 'AUTO' | 'PERFORMANCE' | 'INTEGRATION';
  coverage: number;
  testCount: number;
}
