import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { get } from 'utils';
import { DefaultCell } from './default-cell';

import styles from './table.module.scss';

interface Props {
  className?: string;
  data: any;
  columns?: any[];
  color?: string;
}

export const SecondLevelExpandContent = BEM(styles).row(({
  className,
  data = [],
  columns = [],
}: Props) => data.map((field: any, index: number) => (
  <tr className={className}>
    {columns.map((column) => {
      const Cell = column.Cell || DefaultCell;
      return (
        <td key={column.name} colSpan={column.colSpan}>
          <Cell value={get(field, column.name)} item={field} rowIndex={index} />
        </td>
      );
    })}
  </tr>
)));
