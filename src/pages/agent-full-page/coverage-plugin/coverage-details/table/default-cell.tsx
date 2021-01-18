import { CellProps } from './table-types';

export const DefaultCell = ({ value, testContext }: CellProps<string, unknown>) => (
  <span data-test={`default-cell:${testContext}`}>{value ? String(value) : null}</span>
);
