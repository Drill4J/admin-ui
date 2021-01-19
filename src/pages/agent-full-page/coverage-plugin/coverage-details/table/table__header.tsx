import { BEM } from '@redneckz/react-bem-helper';

import {
  useTableActionsDispatch, setSort, useTableActionsState,
} from 'modules';
import { DefaultHeaderCell } from './default-header-cell';
import { ColumnProps } from './table-types';

import styles from './table-header.module.scss';

interface Props<T> {
  className?: string;
  columns: ColumnProps<unknown, T>[];
  expandedColumnsLength?: number;
}

const tableHeader = BEM(styles);

export const TableHeader = tableHeader(<T, >({ columns, className, expandedColumnsLength }: Props<T>) => {
  const dispatch = useTableActionsDispatch();
  const { sort: [sort] } = useTableActionsState();
  const gridTemplateColumns = expandedColumnsLength
    ? `32px 40% repeat(${columns.length - 2}, 1fr)`
    : `2fr repeat(${columns.length - 1}, 1fr)`;
  return (
    <div className={className} style={{ display: 'grid', gridTemplateColumns }}>
      {columns.map((column) => {
        const { name, HeaderCell, align = 'end' } = column;
        return (
          <TableHeaderCell key={name} style={{ justifySelf: align }}>
            {HeaderCell
              ? HeaderCell({ column })
              : <DefaultHeaderCell column={column} sort={sort} onSort={(cellSort) => dispatch(setSort(cellSort))} />}
          </TableHeaderCell>
        );
      })}
    </div>
  );
});

const TableHeaderCell = tableHeader.tableHeaderCell('div');
