export interface TestStats {
  duration: number;
  result: 'PASSED' | 'FAILED' | 'ERROR' | 'SKIPPED';
}
