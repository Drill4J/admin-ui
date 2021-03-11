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
import tw, { styled } from 'twin.macro';

import { get } from 'utils';
import { MethodCoverage } from 'types/method-coverage';
import { TableRowCell } from './table-row-cell';
import { DefaultCell } from './default-cell';
import { ColumnProps } from './table-types';

interface Props<T> {
  data?: MethodCoverage[];
  columns?: ColumnProps<unknown, T>[];
  color?: string;
}

const Content = styled.div`
  ${tw`grid items-center min-h-40px border-b border-monochrome-medium-tint`}
`;

export const SecondLevelExpandContent = <T, >({ data = [], columns = [] }: Props<T>) => (
  <>
    {data.map((field) => (
      <Content
        style={{ gridTemplateColumns: `104px calc(40% - 72px) repeat(${columns.length - 1}, 1fr)` }}
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
      </Content>
    ))}
  </>
);
