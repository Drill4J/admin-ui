export interface AssociatedTests {
  id?: string;
  tests?: Array<{ name?: string; type?: string }>;
  className?: string;
  methodName?: string;
  packageName?: string;
}
