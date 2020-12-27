import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { SortArrow, useHover } from '@drill4j/ui-kit';

import { ColumnProps, Sort, Order } from './table-types';

import styles from './default-header-cell.module.scss';

interface Props<T> {
  className?: string;
  column: ColumnProps<unknown, T>;
  sort: Sort;
  onSort: (sort: Sort) => void;
}

const defaultHeaderCell = BEM(styles);

export const DefaultHeaderCell = defaultHeaderCell(<T, >({
  className, column: { name, label }, sort, onSort,
}: Props<T>) => {
  const { ref, isVisible } = useHover();
  const activeCell = name === sort?.field;
  return (
    <div className={className} ref={ref} onClick={() => onSort({ order: setOrder(sort?.order), field: name })}>
      {name !== 'selector' && (isVisible || activeCell) && <SortArrow active={activeCell} order={activeCell ? sort.order : null} /> }
      {label}
    </div>
  );
});

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
