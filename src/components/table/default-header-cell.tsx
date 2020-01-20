import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { ColumnProps, Sort } from './table-types';

import styles from './table.module.scss';

export const DefaultHeaderCell = ({
  column,
  sort,
  onSort,
}: {
  column: ColumnProps;
  sort?: Sort;
  onSort?: (sortField: string) => void;
}) => (onSort ? (
  <TableSort onClick={() => onSort(column.name)}>
    {column.label}
    {sort && sort.field === column.name && (
      <TableToggle>
        {/* <Icons.AngleDown rotate={sort.order === 'ASC' ? 180 : undefined} height={4} width={8} /> */}
      </TableToggle>
    )}
  </TableSort>
) : (
  column.label || null
));

const table = BEM(styles);
const TableSort = table.sort('div');
const TableToggle = table.toggle('div');
