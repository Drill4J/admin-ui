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
        key={field.name}
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
