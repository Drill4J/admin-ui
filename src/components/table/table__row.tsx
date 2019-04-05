import * as React from 'react';
import { get } from '../../utils';

import { DefaultCell } from './default-cell';
import { ExpandedRowContent } from './expanded-row-content';
import { ColumnProps } from './table-types';

interface Props {
  item: { [key: string]: unknown };
  columns: any[];
  index: number;
  expanded?: boolean;
  expandedColumns?: any[];
  expandedContentKey?: string;
}

export const TableRow = ({
  item,
  columns,
  index,
  expandedContentKey = '',
  expanded,
  expandedColumns = [],
}: Props) => (
  <>
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
    {expanded && (
      <ExpandedRowContent data={item[expandedContentKey]} expandedColumns={expandedColumns} />
    )}
  </>
);
