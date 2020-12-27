import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { get } from 'utils';
import { MethodCoverage } from 'types/method-coverage';
import { DefaultCell } from './default-cell';
import { ColumnProps } from './table-types';

import styles from './table-row.module.scss';

interface Props<T> {
  className?: string;
  data?: MethodCoverage[];
  columns?: ColumnProps<unknown, T>[];
  color?: string;
}

export const SecondLevelExpandContent = BEM(styles)(<T, >({ className, data = [], columns = [] }: Props<T>) => (
  <>
    {data.map((field) => (
      <div
        className={className}
        style={{ display: 'grid', gridTemplateColumns: `104px calc(40% - 72px) repeat(${columns.length - 1}, 1fr)` }}
      >
        {columns.map((column, index) => {
          const Cell = column.Cell || DefaultCell;
          return (
            <TableRowCell key={column.name} type={column.align || 'end'} style={{ gridColumnStart: `${2 + index}` }}>
              <Cell value={get(field, column.name)} item={field as T} />
            </TableRowCell>
          );
        })}
      </div>
    ))}
  </>
));

const TableRowCell = BEM(styles).tableRowCell('div');
