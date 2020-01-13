import * as React from 'react';

import { ColumnProps } from './list-types';

interface Props {
  className?: string;
  columns: ColumnProps[];
}

export const ListHeader = ({ columns }: Props) => (
  <>
    {columns.map((column, index) => {
      const DefaultHeaderCell = ({ column: { label } }: { column: ColumnProps }) => (
        <div>{label}</div>
      );
      const HeaderCell = column.HeaderCell || DefaultHeaderCell;
      return <HeaderCell column={column} key={`header-cell${index}`} />;
    })}
  </>
);
