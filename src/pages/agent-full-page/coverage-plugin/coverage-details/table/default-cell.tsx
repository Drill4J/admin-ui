import * as React from 'react';

export const DefaultCell = ({ value, testContext }: { value: unknown; testContext?: string }) => (
  <span data-test={`default-cell:${testContext}`}>{value ? String(value) : null}</span>
);
