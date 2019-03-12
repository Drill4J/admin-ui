// @flow
import * as React from 'react';

export interface Sort {
  field: string;
  order: 'ASC' | 'DESC';
}

export type Cell = React.ComponentType<any>;

export interface ColumnProps {
  /**
   * Unique key for cells.
   */
  name: string;

  /**
   * Callback responsible for rendering a cell's contents.
   */
  Cell?: Cell;

  /**
   * Callback responsible for rendering a column header contents.
   */
  HeaderCell?: (props: {
    column: ColumnProps;
    sort?: Sort;
    onSort?: (field: string) => void;
  }) => React.ReactNode;

  /** Header label for this column */
  label?: string;

  /** Width of column */
  width?: string;
}
