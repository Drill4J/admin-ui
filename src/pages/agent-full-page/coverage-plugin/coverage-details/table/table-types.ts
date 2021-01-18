export interface CellProps<T, I> {
  value?: T;
  item?: I;
  rowIndex?: number;
  testContext?: string;
}

export type Cell<T, I> = (props: CellProps<T, I>) => JSX.Element;
export type Order = 'ASC' | 'DESC' | null;
export type Align = 'start' | 'end' | 'center' | 'stretch';

export interface Sort {
  field: string;
  order: Order;
}

export interface ColumnProps<T, I> {
  name: string;
  Cell?: Cell<T, I>;
  HeaderCell?: (props: { column: ColumnProps<T, I> }) => JSX.Element;
  label?: React.ReactNode;
  align?: Align;
  testContext?: string;
}

export interface ExpandSchema {
  key: string;
  columns: React.ReactNode | React.ReactNode[];
  children: ExpandSchema;
}
