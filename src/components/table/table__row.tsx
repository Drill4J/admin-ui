import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { get } from '../../utils';

import { DefaultCell } from './default-cell';
import { ExpandedRowContent } from './expanded-row-content';

import styles from './table.module.scss';

interface Props {
  className?: string;
  item: { [key: string]: unknown };
  columns: any[];
  index: number;
  expanded?: boolean;
  expandedColumns?: any[];
  expandedContentKey?: string;
}

export const TableRow = BEM(styles).row(
  ({
    className,
    item,
    columns,
    index,
    expandedContentKey = '',
    expanded,
    expandedColumns = [],
  }: Props) => (
    <>
      <tr className={className}>
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
  ),
);
