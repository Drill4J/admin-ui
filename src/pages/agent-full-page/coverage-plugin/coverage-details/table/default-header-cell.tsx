/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SortArrow, useHover } from '@drill4j/ui-kit';
import 'twin.macro';

import { ColumnProps, Sort, Order } from './table-types';

interface Props<T> {
  column: ColumnProps<unknown, T>;
  sort: Sort;
  onSort: (sort: Sort) => void;
}

export const DefaultHeaderCell = <T, >({ column: { name, label }, sort, onSort }: Props<T>) => {
  const { ref, isVisible } = useHover();
  const activeCell = name === sort?.field;
  return (
    <div
      tw="relative inline-flex items-center cursor-pointer"
      ref={ref}
      onClick={() => onSort({ order: setOrder(sort?.order), field: name })}
    >
      {name !== 'selector' && (isVisible || activeCell) && <SortArrow active={activeCell} order={activeCell ? sort.order : null} /> }
      {label}
    </div>
  );
};

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
