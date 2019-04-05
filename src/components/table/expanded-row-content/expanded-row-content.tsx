import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { DefaultCell } from '../default-cell';
import { get } from '../../../utils';

import styles from './expanded-row-content.module.scss';

interface Props {
  className?: string;
  data: any;
  expandedColumns?: any[];
}

const expandedRowContent = BEM(styles);

export const ExpandedRowContent = expandedRowContent(
  ({ className, data, expandedColumns = [] }: Props) =>
    data.map((item: any) => (
      <tr className={className} tabIndex={0}>
        {expandedColumns.map((expandedColumn, index) => {
          const Cell = expandedColumn.Cell || DefaultCell;

          return (
            <td key={expandedColumn.name} colSpan={expandedColumn.colSpan}>
              <Cell value={get(item, expandedColumn.name)} item={item} rowIndex={index} />
            </td>
          );
        })}
      </tr>
    )),
);
