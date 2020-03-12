// @flow
import * as React from 'react';

export type Cell = React.ComponentType<any>;

export interface ColumnProps {
  name: string;
  Cell?: Cell;
  HeaderCell?: any;
  label?: string;
  width?: string;
  colSpan?: number;
}

export interface CombinedColumnsProps {
  name: string;
  columns: any[];
}

export interface ExpandSchema {
  key: string;
  columns: React.ReactNode | React.ReactNode[];
  children: ExpandSchema;
}
