import { TestStats } from './test-stats';

export interface AssociatedTests {
  id?: string;
  tests?: Array<{ name?: string; type?: string, stats?: TestStats }>;
  className?: string;
  methodName?: string;
  packageName?: string;
  testType?: string;
}
