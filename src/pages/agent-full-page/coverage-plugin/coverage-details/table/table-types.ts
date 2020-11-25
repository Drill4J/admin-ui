import * as React from 'react';

export type Cell = React.ComponentType<any>;
export type Order = 'ASC' | 'DESC' | null;
export type Align = 'start' | 'end' | 'center' | 'stretch';

export interface Sort {
  field: string;
  order: Order;
}

export interface ColumnProps {
  name: string;
  Cell?: Cell;
  HeaderCell?: (props: { column: ColumnProps }) => JSX.Element;
  label?: React.ReactNode;
  align?: Align;
}

export interface ExpandSchema {
  key: string;
  columns: React.ReactNode | React.ReactNode[];
  children: ExpandSchema;
}
