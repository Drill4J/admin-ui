import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { SortArrows } from '@drill4j/ui-kit';

import { ColumnProps, Sort, Order } from './table-types';

import styles from './default-header-cell.module.scss';

interface Props {
  className?: string;
  column: ColumnProps;
  sort: Sort;
  onSort: (sort: Sort) => void;
}

const defaultHeaderCell = BEM(styles);

export const DefaultHeaderCell = defaultHeaderCell(({
  className, column: { name, label }, sort, onSort,
}: Props) => (
  <div className={className} onClick={() => onSort({ order: setOrder(sort?.order), field: name })}>
    {name !== 'selector' && <SortArrows order={name === sort?.field ? sort.order : null} /> }
    {label}
  </div>
));

function setOrder(order: Order) {
  switch (order) {
    case 'ASC':
      return 'DESC';
    case 'DESC':
      return null;
    default:
      return 'ASC';
  }
}
