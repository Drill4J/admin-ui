export interface TestStats {
  duration: number;
  status: 'PASSED' | 'FAILED' | 'ERROR' | 'SKIPPED';
}
