import { Cell } from './table-types';

export const DefaultCell = ({ value }: { value: unknown }) => (value ? String(value) : null);
