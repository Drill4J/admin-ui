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
