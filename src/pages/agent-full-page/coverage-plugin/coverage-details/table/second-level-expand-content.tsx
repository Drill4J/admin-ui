import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { get } from 'utils';
import { DefaultCell } from './default-cell';

import styles from './table-row.module.scss';

interface Props {
  className?: string;
  data: any;
  columns?: any[];
  color?: string;
}

export const SecondLevelExpandContent = BEM(styles)(({
  className,
  data = [],
  columns = [],
}: Props) => data.map((field: any) => (
  <div className={className} style={{ display: 'grid', gridTemplateColumns: `104px calc(40% - 72px) repeat(${columns.length - 1}, 1fr)` }}>
    {columns.map((column, index) => {
      const Cell = column.Cell || DefaultCell;
      return (
        <TableRowCell key={column.name} type={column.align || 'end'} style={{ gridColumnStart: `${2 + index}` }}>
          <Cell value={get(field, column.name)} item={field} />
        </TableRowCell>
      );
    })}
  </div>
)));

const TableRowCell = BEM(styles).tableRowCell('div');
