import * as React from 'react';
import { get } from '../../utils';

import { DefaultCell } from './default-cell';
import { ColumnProps } from './table-types';

interface Props {
  item: object;
  columns: any[];
  index: number;
}

export const TableRow = ({ item, columns, index }: Props) => (
  <tr>
    {columns.map((column) => {
      const Cell = column.Cell || DefaultCell;
      return (
        <td key={column.name}>
          <Cell value={get(item, column.name)} item={item} rowIndex={index} />
        </td>
      );
    })}
  </tr>
);
