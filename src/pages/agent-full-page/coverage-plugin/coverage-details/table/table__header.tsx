import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import {
  useTableActionsDispatch, setSort, useTableActionsState,
} from 'modules';
import { DefaultHeaderCell } from './default-header-cell';

import styles from './table.module.scss';

interface Props {
  className?: string;
  columns: any[];
}

export const TableHeader = BEM(styles).header(({ columns, className }: Props) => {
  const dispatch = useTableActionsDispatch();
  const { sort: [sort] } = useTableActionsState();
  return (
    <thead className={className}>
      <tr>
        {columns.map((column) => {
          const {
            name, width, HeaderCell, align = 'left',
          } = column;
          return (
            <th key={name} style={{ width }} align={align}>
              {HeaderCell
                ? HeaderCell({ column })
                : <DefaultHeaderCell column={column} sort={sort} onSort={(cellSort) => dispatch(setSort(cellSort))} />}
            </th>
          );
        })}
      </tr>
    </thead>
  );
});
