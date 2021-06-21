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
import { DefaultCell } from './default-cell';
import { ExpandedRowContent } from './expanded-row-content';
import { TableRowCell } from './table-row-cell';
import { ColumnProps } from './table-types';

type Colors = 'blue' | 'gray' | 'yellow';

interface Props<T> {
  item: T;
  columns: ColumnProps<unknown, T>[];
  index: number;
  color?: Colors;
  expandedColumns?: ColumnProps<unknown, T>[];
  secondLevelExpand?: ColumnProps<unknown, T>[];
  expandedContentKey?: string;
  expandedRows?: string[];
  classesTopicPrefix: string;
}

const Content = styled.div(({ color }: {color?: Colors}) => [
  tw`grid items-center min-h-40px border-b border-monochrome-medium-tint`,
  color && tw`bg-monochrome-light-tint`,
]);

export const TableRow = <T, >({
  item,
  columns,
  index,
  expandedContentKey = '',
  color,
  expandedColumns = [],
  secondLevelExpand = [],
  expandedRows = [],
  classesTopicPrefix,
}: Props<T>) => {
  const gridTemplateColumns = expandedColumns?.length
    ? `32px 40% repeat(${columns.length - 2}, 1fr)`
    : `2fr repeat(${columns.length - 1}, 1fr)`;
  return (
    <>
      <Content
        color={color}
        style={{ gridTemplateColumns }}
        data-test="table-row"
      >
        {columns.map((column) => {
          const Cell = column.Cell || DefaultCell;
          return (
            <TableRowCell key={column.name} type={column.align || 'end'}>
              <Cell value={get(item, column.name)} item={item} rowIndex={index} testContext={column?.testContext} />
            </TableRowCell>
          );
        })}
      </Content>
      {color && (
        <ExpandedRowContent
          key={String(get(item, expandedContentKey))}
          item={get(item, expandedContentKey)}
          expandedColumns={expandedColumns}
          secondLevelExpand={secondLevelExpand}
          expandedRows={expandedRows}
          classesTopicPrefix={classesTopicPrefix}
        />
      )}
    </>
  );
};
