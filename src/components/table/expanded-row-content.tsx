import * as React from 'react';

import { DefaultCell } from './default-cell';
import { get } from '../../utils';

interface Props {
  data: any;
  expandedColumns?: any[];
}

export const ExpandedRowContent = ({ data, expandedColumns = [] }: Props) =>
  data.map((item: any) => (
    <tr tabIndex={0}>
      {expandedColumns.map((expandedColumn, index) => {
        const Cell = expandedColumn.Cell || DefaultCell;

        return (
          <td key={expandedColumn.name} colSpan={expandedColumn.colSpan}>
            <Cell value={get(item, expandedColumn.name)} item={item} rowIndex={index} />
          </td>
        );
      })}
    </tr>
  ));
