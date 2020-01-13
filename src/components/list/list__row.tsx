import * as React from 'react';

import { get } from 'utils';
import { ColumnProps } from './list-types';

interface Props {
  className?: string;
  item: { [key: string]: unknown };
  columns: ColumnProps[];
  index: number;
}

export const ListRow = ({ item, columns }: Props) => (
  <>
    {columns.map((column) => {
      const DefaultCell = ({ value }: { value: unknown; item: { [key: string]: unknown } }) => (
        <div>{String(value)}</div>
      );
      const Cell = column.Cell || DefaultCell;
      return (
        <div key={column.name}>
          <Cell value={get(item, column.name)} item={item} />
        </div>
      );
    })}
  </>
);
