interface TestStats {
  duration: number;
  result: 'PASSED' | 'FAILED' | 'ERROR' | 'SKIPPED';
}

export interface AssociatedTests {
  id?: string;
  tests?: Array<{ name?: string; type?: string, stats?: TestStats }>;
  className?: string;
  methodName?: string;
  packageName?: string;
  testType?: string;
}
